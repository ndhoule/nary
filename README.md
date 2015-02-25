# nary [![Circle CI][circleci-badge]][circleci-link]

Wrap a function so that it only accepts a predefined number of arguments.

## Installation

```sh
component install ndhoule/nary
```

## API

### `nary(n : number, func: Function)`

Wrap a function in a wrapper that passes a maximum of `n` arguments to the wrapped function.

```javascript
['1', '2', '3'].map(nary(1, parseInt)); // => [1, 2, 3]
```

## License

Released under the [MIT license](LICENSE.md).

[circleci-link]: https://circleci.com/gh/ndhoule/nary
[circleci-badge]: https://circleci.com/gh/ndhoule/nary.svg?style=svg&circle-token=08fd2d5910f0d6dbdf38c94a5370e77dc7c9b811
