use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
use regex::Regex;

struct PasswordLine {
    target_char: char,
    min: u16,
    max: u16,
    password: String,
}

impl PasswordLine {
    fn parse(input: String) -> PasswordLine {
        let line_re = Regex::new(r"(\d+)-(\d+) ([a-z]): ([a-z]+)").unwrap();
        let cap = line_re.captures(&input).unwrap();

        if cap.len() != 5 {
            panic!("invalid line: {}", input);
        }

        return PasswordLine {
            min: cap[1].to_string().parse::<u16>().unwrap(),
            max: cap[2].to_string().parse::<u16>().unwrap(),
            target_char: cap[3].to_string().chars().nth(0).unwrap(),
            password: cap[4].to_string(),
        };
    }

    fn valid(&self) -> bool {
        let mut instances = 0;

        for c in self.password.chars().into_iter() {
            if c == self.target_char {
                instances += 1;
            }
        }

        return instances >= self.min && instances <= self.max;
    }

    fn valid_pt2(&self) -> bool {
        let mut pos_1_valid = false;
        let mut pos_2_valid = false;

        for (i, c) in self.password.chars().into_iter().enumerate() {
            if ((i + 1) == (self.min as usize)) && c == self.target_char {
                pos_1_valid = true;
            }

            if ((i + 1) == (self.max as usize)) && c == self.target_char {
                pos_2_valid = true;
            }
        }

        return pos_1_valid ^ pos_2_valid;
    }
}

// https://adventofcode.com/2020/day/2
fn main() {
    let mut valid_passwords = 0;
    let mut valid_passwords_pt2 = 0;

    if let Ok(lines) = read_lines("./input.txt") {
        for line in lines {
            let password_line = PasswordLine::parse(line.unwrap());

            if password_line.valid() {
                valid_passwords += 1;
            }

            if password_line.valid_pt2() {
                valid_passwords_pt2 += 1;
            }
        }
    }

    println!("{} valid passwords found for part 1!", valid_passwords);
    println!("{} valid passwords found for part 2!", valid_passwords_pt2);
}

// The output is wrapped in a Result to allow matching on errors
// Returns an Iterator to the Reader of the lines of the file.
fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
