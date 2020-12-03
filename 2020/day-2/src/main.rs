use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
use regex::Regex;

struct PasswordLine {
    target_char: String,
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
            target_char: cap[3].to_string(),
            password: cap[4].to_string(),
        };
    }

    fn valid(&self) -> bool {
        let mut instances = 0;

        for c in self.password.chars().into_iter() {
            if String::from(c) == self.target_char {
                instances += 1;
            }
        }

        return instances >= self.min && instances <= self.max;
    }
}

fn main() {
    let mut valid_passwords = 0;

    if let Ok(lines) = read_lines("./input.txt") {
        for line in lines {
            let password_line = PasswordLine::parse(line.unwrap());

            if password_line.valid() {
                valid_passwords += 1;
            }
        }
    }

    println!("{} valid passwords found!", valid_passwords);
}

// The output is wrapped in a Result to allow matching on errors
// Returns an Iterator to the Reader of the lines of the file.
fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
