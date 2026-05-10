import sys
import re

path = r'c:\PROTOCOL-WEB-main\src\components\RulesContent.tsx'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('const ruleCategories = [')
end_idx = text.find('];\n\nexport function')
if end_idx == -1:
    end_idx = text.find('];\r\n\r\nexport function')

if start_idx != -1 and end_idx != -1:
    def get_obj(id_name):
        idx = text.find("id: '" + id_name + "'")
        if idx == -1: return None
        start = text.rfind('  {', 0, idx)
        braces = 0
        end = -1
        for i in range(start, len(text)):
            if text[i] == '{':
                braces += 1
            elif text[i] == '}':
                braces -= 1
                if braces == 0:
                    end = i
                    break
        return text[start:end+1]

    g = get_obj('general')
    rp = get_obj('roleplay')
    ca = get_obj('criminal-activities')
    gg = get_obj('gang')
    lf = get_obj('life')
    ec = get_obj('economy')
    ac = get_obj('account')
    
    if all([g, rp, ca, gg, lf, ec, ac]):
        new_arr = 'const ruleCategories = [\n' + g + ',\n' + rp + ',\n' + ca + ',\n' + gg + ',\n' + lf + ',\n' + ec + ',\n' + ac + '\n];'
        new_text = text[:start_idx] + new_arr + text[end_idx+2:]
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_text)
        print('Python replacement success')
    else:
        print('Missing objects')
else:
    print('Could not find start/end')
