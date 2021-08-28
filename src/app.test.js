/* global describe, expect, it */
'use strict'

const {
  testFunc
} = require('./app')

describe('app:function Tests for testFunc', () => {
  it('returns correct exponent calculations', () => {
    expect.assertions(1)

    // calculate 3^2 power
    const result = testFunc(3, 2)

    expect(result).toEqual(9)
  })
})
