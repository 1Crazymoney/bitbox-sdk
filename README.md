# `bitbox-cli`

## Command line tool for https://www.bitbox.earth

More documentation available at:

* [General docs](https://www.bitbox.earth/docs)
* [BITBOX API](https://www.bitbox.earth/bitboxcli)
* [BITBLOG](https://bigearth.github.io/bitblog/)

### Usage

```
Usage: bitbox [options] [command]


Options:

  -V, --version  output the version number
  -h, --help     output usage information


Commands:

  new [options]  The 'bitbox new' command creates a new BITBOX application w/ a
    directory structure and bitbox.js configuration file.

    Pass in command line arguments or optionally specify commonly used arguments in a .bitboxrc file in your home directory

  console        Run a console with Bitcoin Cash RPC commands available
  scaffold [options]  Scaffold out basic apps in major frameworks w/ BITBOX bindings
```

### `new`

Stubs out a directory structure w/ a bitbox.js file that has localhost:8332 settings to connect to your local running BITBOX.

```
Usage: new [options]

The 'bitbox new' command creates a new BITBOX application w/ a
directory structure and bitbox.js configuration file.

Pass in command line arguments or optionally specify commonly used arguments in a .bitboxrc file in your home directory


Options:

  -t, --title <title>        Title of new project
  -e, --environment <environment> environment of running BITBOX instance. Ex: production, staging. Default: development
  -r, --protocol <protocol>  protocol of running BITBOX instance. Default: http
  -o, --host <host>          host of running BITBOX instance. Default: localhost
  -p, --port <port>          port of running BITBOX instance. Default: 8332
  -u, --username <username>  Bitcoin Cash JSON RPC username
  -a, --password <passwore>  Bitcoin Cash JSON RPC password
  -h, --help                 output usage information
```

#### `.bitboxrc`

You can store common settings in a `~/.bashrc` in the `ini` format:

```
; bitbox config comment

[new]
protocol = http
host = localhost
port = 8332
username: h4x04
password: l337
```

### `console`

custom REPL w/ the entire BCH RPC on a `BITBOX` object. [Full list](https://www.bitbox.earth/bitboxcli) of available methods.

```
Usage: console [options]

Run a console with Bitcoin Cash RPC commands available


Options:

  -e, --environment <environment> environment of running BITBOX instance. Ex: production, staging. Default: development
  -h, --help  output usage information
```

### `scaffold`

Quickly scaffold basic applications in major frameworks so you can focus on your app.

```
Usage: scaffold [options]

Scaffold out basic apps in major frameworks w/ BITBOX bindings


Options:

  -f, --framework <framework>  The framework to use. Options include React
  -h, --help                   output usage information
  ```
