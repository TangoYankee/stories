use std::io::Write;
use std::process::Command;

fn main() {
    let command = Command::new("echo")
                  .arg("Hello, world!")
                  .output()
                  .expect("Uh oh, couldn't say hello!");
    std::io::stdout().write_all(&command.stdout).unwrap();

    assert_eq!(std::str::from_utf8(&command.stdout).unwrap(), "Hello world!\n");
}
