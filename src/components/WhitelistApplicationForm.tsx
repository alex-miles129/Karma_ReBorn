'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { 
  Lock, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Loader2,
  Tv
} from "lucide-react"

interface WhitelistApplicationFormProps {
  disabled?: boolean;
  cooldownRemaining?: number;
}

type QuizState = 'start' | 'loading' | 'quiz' | 'submitting' | 'success' | 'failure';

interface Question {
  id: number;
  question: string;
  options: string[];
}

export function WhitelistApplicationForm({ disabled = false, cooldownRemaining = 0 }: WhitelistApplicationFormProps) {
  const [open, setOpen] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [terminated, setTerminated] = useState(false);
  const [cooldown, setCooldown] = useState(cooldownRemaining);
  const [errorMessage, setErrorMessage] = useState('');
  const [questionTimeLeft, setQuestionTimeLeft] = useState(30);

  const selectedOptionRef = useRef<string | null>(null);
  const answersRef = useRef<Record<number, string>>({});
  const currentQuestionIndexRef = useRef(0);
  const questionsRef = useRef<Question[]>([]);

  useEffect(() => { selectedOptionRef.current = selectedOption; }, [selectedOption]);
  useEffect(() => { answersRef.current = answers; }, [answers]);
  useEffect(() => { currentQuestionIndexRef.current = currentQuestionIndex; }, [currentQuestionIndex]);
  useEffect(() => { questionsRef.current = questions; }, [questions]);
  
  const { toast } = useToast();
  const { data: session } = useSession();

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1000) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  // Synchronize initial cooldownRemaining prop if it updates
  useEffect(() => {
    setCooldown(cooldownRemaining);
  }, [cooldownRemaining]);

  // Format cooldown to HH:MM:SS
  const formatCooldown = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    
    return `${hours}h ${mins}m ${secs}s`;
  };

  // Screen Monitoring for cheating prevention
  useEffect(() => {
    if (quizState !== 'quiz') return;

    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1024;
    if (isMobileDevice) {
      console.log("Mobile device detected: bypassing strict anti-cheat listeners.");
      return;
    }

    const handleScreenChange = () => {
      const isFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );

      if (!isFullscreen) {
        console.log("Fullscreen exited, terminating test.");
        handleTerminate("exited fullscreen");
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        console.log("Visibility hidden (tab switched/minimized), terminating test.");
        handleTerminate("switched tabs or minimized the window");
      }
    };

    const handleBlur = () => {
      console.log("Window lost focus, terminating test.");
      handleTerminate("clicked outside the browser window");
    };

    document.addEventListener('fullscreenchange', handleScreenChange);
    document.addEventListener('webkitfullscreenchange', handleScreenChange);
    document.addEventListener('mozfullscreenchange', handleScreenChange);
    document.addEventListener('MSFullscreenChange', handleScreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('fullscreenchange', handleScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleScreenChange);
      document.removeEventListener('mozfullscreenchange', handleScreenChange);
      document.removeEventListener('MSFullscreenChange', handleScreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [quizState]);

  // Quit/Terminate quiz flow
  const handleTerminate = async (reason: string) => {
    setQuizState('submitting');
    setTerminated(true);

    try {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
      }
    } catch (fsErr) {
      console.warn("Could not exit fullscreen:", fsErr);
    }

    toast({
      title: "Test Terminated Automatically",
      description: `Your whitelist attempt was failed because you ${reason}.`,
      variant: "destructive",
      duration: 10000
    });

    try {
      const response = await fetch('/api/applications/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: {},
          terminated: true
        })
      });
      const data = await response.json();
      if (data.success) {
        setCooldown(data.cooldownRemaining || 1.5 * 60 * 60 * 1000);
      }
    } catch (err) {
      console.error("Error submitting quiz termination:", err);
    }

    setScore(0);
    setQuizState('failure');
  };

  // Start test and enter fullscreen
  const startQuiz = async () => {
    setErrorMessage('');
    setQuizState('loading');
    
    try {
      const response = await fetch('/api/applications/whitelist-questions');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch questions');
      }

      setQuestions(data.questions);
      setAnswers({});
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setTerminated(false);

      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1024;
      if (!isMobileDevice) {
        const element = document.documentElement;
        try {
          if (element.requestFullscreen) {
            await element.requestFullscreen();
          } else if ((element as any).webkitRequestFullscreen) {
            await (element as any).webkitRequestFullscreen();
          } else if ((element as any).msRequestFullscreen) {
            await (element as any).msRequestFullscreen();
          }
        } catch (fsErr) {
          console.warn("Could not enter fullscreen mode:", fsErr);
        }
      }

      // Add a slight delay before binding screen monitor listeners
      setTimeout(() => {
        setQuizState('quiz');
      }, 500);

    } catch (err: any) {
      console.error(err);
      setQuizState('start');
      toast({
        title: "Error Starting Quiz",
        description: err.message || "An error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  // 15-second question timer
  useEffect(() => {
    if (quizState !== 'quiz') return;

    setQuestionTimeLeft(30);

    const timer = setInterval(() => {
      setQuestionTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Advance automatically on timeout
          handleNext(true);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, quizState]);

  // Select next question or submit quiz
  const handleNext = (isTimeout = false) => {
    const curOpt = isTimeout ? "" : selectedOptionRef.current;
    if (!isTimeout && !curOpt) return;

    const curIndex = currentQuestionIndexRef.current;
    const currentQuestion = questionsRef.current[curIndex];
    if (!currentQuestion) return;

    const updatedAnswers = {
      ...answersRef.current,
      [currentQuestion.id]: curOpt || ""
    };
    
    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (curIndex < 9) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      submitQuiz(updatedAnswers);
    }
  };

  // Submit test answers to backend
  const submitQuiz = async (finalAnswers: Record<number, string>) => {
    setQuizState('submitting');

    try {
      try {
        if (document.fullscreenElement) {
          if (document.exitFullscreen) {
            await document.exitFullscreen();
          } else if ((document as any).webkitExitFullscreen) {
            await (document as any).webkitExitFullscreen();
          }
        }
      } catch (fsErr) {
        console.warn("Could not exit fullscreen:", fsErr);
      }

      const response = await fetch('/api/applications/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: finalAnswers,
          terminated: false
        })
      });

      const data = await response.json();

      if (data.success) {
        setScore(data.score);
        if (data.passed) {
          setQuizState('success');
          toast({
            title: "Congratulations!",
            description: "You passed the whitelist quiz and are now whitelisted!",
            variant: "success",
            duration: 8000
          });
        } else {
          setCooldown(data.cooldownRemaining || 1.5 * 60 * 60 * 1000);
          setQuizState('failure');
          toast({
            title: "Test Failed",
            description: `You scored ${data.score}/10. You need at least 7/10 to pass.`,
            variant: "destructive",
            duration: 8000
          });
        }
      } else {
        throw new Error(data.error || "Failed to submit answers");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to submit quiz. Please try again.");
      setQuizState('failure');
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    // block exit during active quiz
    if (quizState === 'quiz' || quizState === 'submitting') {
      return;
    }
    setOpen(isOpen);
    if (!isOpen) {
      setQuizState('start');
      setErrorMessage('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={disabled || cooldown > 0 ? undefined : handleOpenChange}>
      <DialogTrigger asChild>
        <Button 
          className={cn(
            "w-full sm:w-auto font-bold transition-all duration-300",
            disabled 
              ? "bg-emerald-600 hover:bg-emerald-600 text-white cursor-default" 
              : cooldown > 0
                ? "bg-neutral-800 hover:bg-neutral-800 text-neutral-400 cursor-not-allowed border border-neutral-700"
                : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]"
          )}
          size="lg"
          disabled={disabled || cooldown > 0}
        >
          {disabled 
            ? 'Already Whitelisted' 
            : cooldown > 0 
              ? `Cooldown: ${formatCooldown(cooldown)}`
              : 'Fill Form'
          }
        </Button>
      </DialogTrigger>
      
      <DialogContent 
        className={cn(
          "w-[94vw] max-w-2xl bg-zinc-950 border-zinc-800/80 text-white rounded-xl shadow-2xl transition-all duration-300 max-h-[95vh] overflow-y-auto",
          quizState === 'quiz' ? "p-4 sm:p-8 sm:max-w-3xl h-[90vh] sm:h-[85vh] flex flex-col justify-between" : "p-6"
        )}
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (quizState === 'quiz') e.preventDefault();
        }}
      >
        {/* START SCREEN */}
        {quizState === 'start' && (
          <div className="space-y-6 py-4">
            <DialogHeader>
              <DialogTitle className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-2">
                <Lock className="w-7 h-7 text-purple-400 animate-pulse" /> Whitelist Quiz Challenge
              </DialogTitle>
              <DialogDescription className="text-zinc-400 text-sm mt-1">
                Complete the challenge to automatically get whitelisted on the India Town Roleplay server.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-amber-950/20 border border-amber-900/35 p-4 rounded-lg text-sm text-amber-300 flex items-start gap-3 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-100 uppercase tracking-wider block mb-1 text-xs">Quiz Requirement Warning:</strong>
                There are a total of <span className="text-white font-bold underline">10 questions</span>. You have exactly <span className="text-white font-bold underline">30 seconds per question</span>. You need at least <span className="text-white font-bold underline">7 correct answers</span> to pass the quiz.
              </div>
            </div>

            <div className="space-y-4 bg-zinc-900/40 border border-zinc-800/60 p-5 rounded-lg text-sm text-zinc-300">
              <h3 className="font-semibold text-zinc-100 text-base mb-2 flex items-center gap-2">
                Rules & Information:
              </h3>
              <ul className="space-y-3 list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-0.5">•</span>
                  <span>You will be given <strong>10 questions selected at random</strong> from our whitelist question pool. Each question has a <strong>30-second time limit</strong>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-0.5">•</span>
                  <span>All choices/options are jumbled dynamically for each test.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-0.5">•</span>
                  <span>You must answer at least <strong>7 questions correctly (70%)</strong> to pass and automatically receive the Discord whitelist role.</span>
                </li>
                <li className="flex items-start gap-3 bg-red-950/20 border border-red-900/30 p-3 rounded text-red-300">
                  <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-red-200">Anti-Cheat System Active:</strong> Starting the quiz forces the browser to go into <strong>Full Screen</strong>. If you exit fullscreen, switch tabs, minimize, or click outside the window, the quiz will end instantly as a failure.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-0.5">•</span>
                  <span>If you fail or trigger the anti-cheat, you must wait <strong>1.5 hours</strong> before you can attempt the test again.</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                className="border-zinc-800 hover:bg-zinc-900 text-zinc-300 hover:text-white"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="button"
                className="bg-primary text-primary-foreground hover:bg-primary/95 font-bold px-6"
                onClick={startQuiz}
              >
                Start Quiz
              </Button>
            </div>
          </div>
        )}

        {/* LOADING SCREEN */}
        {quizState === 'loading' && (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
            <h3 className="text-lg font-semibold">Generating Quiz & Entering Full Screen...</h3>
            <p className="text-sm text-zinc-400 text-center max-w-sm">Please do not press any keys or click outside the window while the quiz is setting up.</p>
          </div>
        )}

        {/* ACTIVE QUIZ SCREEN */}
        {quizState === 'quiz' && questions.length > 0 && (
          <div className="flex flex-col h-full justify-between">
            {/* Header section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-purple-400 tracking-wider uppercase">Whitelist Quiz Challenge</span>
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm text-zinc-400">Question {currentQuestionIndex + 1} of 10</h3>
                    <span className={cn(
                      "text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition-all duration-300",
                      questionTimeLeft <= 5 
                        ? "bg-red-600 text-white border border-red-500 animate-fast-tick shadow-[0_0_10px_rgba(220,38,38,0.5)]" 
                        : questionTimeLeft <= 10
                          ? "bg-red-600 text-white border border-red-500"
                          : "bg-zinc-900 text-zinc-300 border border-zinc-800"
                    )}>
                      ⏱️ {questionTimeLeft}s
                    </span>
                  </div>
                </div>
                <Badge variant="destructive" className="bg-red-950/60 border border-red-800/40 text-red-200 text-xs px-2.5 py-1 flex items-center gap-1.5 animate-pulse">
                  <Tv className="w-3.5 h-3.5" /> {typeof window !== 'undefined' && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1024) ? "Mobile Session" : "Full Screen Monitored"}
                </Badge>
              </div>
              <Progress 
                value={(currentQuestionIndex / 10) * 100} 
                className="h-2 bg-zinc-900 overflow-hidden" 
              />
            </div>

            {/* Question section */}
            <div className="my-auto py-4 sm:py-8 overflow-y-auto flex-1 max-h-[60vh] pr-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug mb-4 sm:mb-8">
                {questions[currentQuestionIndex].question}
              </h2>

              <div className="space-y-3.5">
                {questions[currentQuestionIndex].options.map((option) => {
                  const isSelected = selectedOption === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedOption(option)}
                      className={cn(
                        "w-full text-left p-4.5 rounded-lg border transition-all duration-200 text-sm md:text-base leading-relaxed flex items-center justify-between",
                        isSelected 
                          ? "bg-purple-950/30 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.15)] text-purple-200 font-semibold" 
                          : "bg-zinc-900/30 border-zinc-800/80 hover:bg-zinc-900/60 hover:border-zinc-700 text-zinc-300"
                      )}
                    >
                      <span>{option}</span>
                      <div className={cn(
                        "w-4 h-4 rounded-full border shrink-0 ml-3 flex items-center justify-center",
                        isSelected ? "border-purple-500 bg-purple-500" : "border-zinc-700"
                      )}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer section */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-500 hover:text-red-400 text-xs transition-colors"
                onClick={() => handleTerminate("manually quit the quiz")}
              >
                Exit Quiz
              </Button>
              <Button
                type="button"
                className={cn(
                  "px-8 font-bold text-white",
                  selectedOption 
                    ? "bg-purple-600 hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]" 
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50"
                )}
                disabled={!selectedOption}
                onClick={() => handleNext()}
              >
                {currentQuestionIndex === 9 ? 'Submit Quiz' : 'Next Question'}
              </Button>
            </div>
          </div>
        )}

        {/* SUBMITTING SCREEN */}
        {quizState === 'submitting' && (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
            <h3 className="text-lg font-semibold">Evaluating Your Results...</h3>
            <p className="text-sm text-zinc-400 text-center max-w-sm">Please hold on while we check your answers and update your whitelist status.</p>
          </div>
        )}

        {/* SUCCESS RESULT SCREEN */}
        {quizState === 'success' && (
          <div className="flex flex-col items-center text-center py-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-white">Quiz Passed!</h2>
              <p className="text-emerald-400 font-semibold text-lg">Score: {score}/10</p>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                Congratulations! You successfully answered {score} questions correctly. You have been whitelisted, and your Discord role has been updated.
              </p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-lg w-full max-w-md space-y-2 text-sm text-left text-zinc-300">
              <div className="flex justify-between">
                <span>Attempt Status:</span>
                <span className="font-semibold text-emerald-400">PASSED</span>
              </div>
              <div className="flex justify-between">
                <span>Discord Whitelist Role:</span>
                <span className="font-semibold text-zinc-100">Assigned Successfully</span>
              </div>
              <div className="flex justify-between">
                <span>Time Completed:</span>
                <span className="font-semibold text-zinc-400">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <Button
              type="button"
              className="bg-emerald-600 hover:bg-emerald-500 font-bold px-8"
              onClick={() => {
                setOpen(false);
                window.location.reload(); // Reload to refresh role status UI
              }}
            >
              Finish & Return
            </Button>
          </div>
        )}

        {/* FAILURE RESULT SCREEN */}
        {quizState === 'failure' && (
          <div className="flex flex-col items-center text-center py-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-red-950/60 border border-red-500/50 flex items-center justify-center text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              {terminated ? <AlertTriangle className="w-12 h-12" /> : <XCircle className="w-12 h-12" />}
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-white">
                {terminated ? 'Attempt Terminated' : 'Quiz Failed'}
              </h2>
              {errorMessage ? (
                <p className="text-red-400 text-sm font-semibold">{errorMessage}</p>
              ) : (
                <p className="text-red-400 font-semibold text-lg">
                  {terminated ? 'Anti-Cheat Triggered' : `Score: ${score}/10 (Required: 7/10)`}
                </p>
              )}
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                {terminated 
                  ? "Your attempt was immediately terminated because you exited fullscreen mode, switched windows, or lost focus."
                  : `Unfortunately, you did not achieve the required passing score of 7/10.`
                }
              </p>
            </div>

            {cooldown > 0 && (
              <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-lg w-full max-w-md space-y-3">
                <p className="text-sm text-zinc-400">You must wait before you can reattempt the whitelist quiz:</p>
                <div className="text-2xl font-mono font-bold text-amber-500 tracking-wider">
                  {formatCooldown(cooldown)}
                </div>
              </div>
            )}

            <Button
              type="button"
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-8 border border-zinc-700"
              onClick={() => {
                setOpen(false);
                window.location.reload(); // Reload to refresh cooldown UI
              }}
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}