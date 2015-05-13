# generator-aronnax
Yeoman generator to create an aronnax-style module

## Use
Run with yeoman with the name of the project as the only option.

```
yo aronnax myapp
```

Pass default options of `skip-install` and `skip-install-messages` if needed.

```
yo aronnax myapp --skip-instal --skip-install-messages
```

Will ask the following:
- description of module.
- author.
- email, used for npm.
- whether to include integration tests.
