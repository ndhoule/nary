# nary [![CI][ci-badge]][ci-link]

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

[ci-link]: https://travis-ci.org/ndhoule/nary
[ci-badge]: https://travis-ci.org/ndhoule/nary.svg?branch=master
