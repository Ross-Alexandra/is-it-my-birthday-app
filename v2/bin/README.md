# bin
A bin file is often used to store binaries used to run programs. In this case,
the bin file is used to store scripts which are used to run, build, test, or
deploy various parts of the project.

# How to create a bin script
The activate command will automatically search the bin directory for scripts
ending in `.sh` and source them. This means that when you run `activate`,
all of the `.sh` scripts in the bin directory will be run.

To create a bin script, simply create a file in the bin directory with the
`.sh` extension which contains a function definition. For example, the
following script exports a function called `hello_world` which prints: 
`Hello, World!` to the console. After running `activate`, you can run
`hello_world` from the command line to print `Hello, World!` to the console.

```bash
#!/usr/bin
function hello_world() {
    echo "Hello, World!"
}
```

# How to run commands when activating
If you want to run a command when activating, you can simply add it to the
`activate` function in the `activate.sh` file. For example, if you want to
print `Hello, World!` to the console when activating, you can add the
following line to the `activate` function:

```bash
echo "Hello, World!"
```
