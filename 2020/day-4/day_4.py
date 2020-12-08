import dataclasses
import re

HEIGHT_REGEX = re.compile(r"^(\d+)(in|cm)$")
COLOR_REGEX = re.compile(r"^#[a-f0-9]{6}$")
PASSPORT_REGEX = re.compile(r"^(\d{9})$")
EYE_COLORS = ('amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth')

# This is very ugly code. I wanted to try out dataclasses and about half way
# through the project, I realized that I should have used a validation library.
@dataclasses.dataclass
class NorthPoleCredentials:
    byr: str = ''
    iyr: str = ''
    eyr: str = ''
    hgt: str = ''
    hcl: str = ''
    ecl: str = ''
    pid: str = ''
    cid: str = ''

    @classmethod
    def parse(cls, line):
        cred = cls()

        for key, value in cls.parse_line(line):
            setattr(cred, key, value)

        return cred

    def update(self, line):
        for key, value in self.parse_line(line):
            setattr(self, key, value)

    @staticmethod
    def parse_line(line):
        for parts in line.split(' '):
            key, value = parts.split(':')
            yield (key, value.strip())

    def valid(self):
        required_fields = []

        for field in dataclasses.fields(self):
            if field.name == 'cid':
                continue
            elif field.name == 'byr':
                required_fields.append(1920 <= int(self.byr or 0) <= 2002)
            elif field.name == 'iyr':
                required_fields.append(2010 <= int(self.iyr or 0) <= 2020)
            elif field.name == 'eyr':
                required_fields.append(2020 <= int(self.eyr or 0) <= 2030)
            elif field.name == 'hgt':
                m = HEIGHT_REGEX.match(self.hgt)

                if not m:
                    required_fields.append(False)
                    continue

                if len(m.groups()) != 2:
                    required_fields.append(False)
                    continue


                num, unit = m.groups()

                if unit == 'cm':
                    required_fields.append(150 <= int(num) <= 193)
                elif unit == 'in':
                    required_fields.append(59 <= int(num) <= 76)
                else:
                    required_fields.append(False)

            elif field.name == 'hcl':
                required_fields.append(COLOR_REGEX.match(self.hcl) is not None)
            elif field.name == 'ecl':
                required_fields.append(self.ecl in EYE_COLORS)
            elif field.name == 'pid':
                required_fields.append(PASSPORT_REGEX.match(self.pid) is not None)

        return all(required_fields) and len(required_fields) >= 7

creds = []

with open('input.txt') as fh:
    current_cred = None

    for line in fh:
        if line == "\n":
            creds.append(current_cred)
            current_cred = None
            continue

        if not current_cred:
            current_cred = NorthPoleCredentials.parse(line)
        else:
            current_cred.update(line)
    else:
        creds.append(current_cred)

valid_documents = sum(cred.valid() for cred in creds)
print(f"There are {valid_documents} valid documents.")
