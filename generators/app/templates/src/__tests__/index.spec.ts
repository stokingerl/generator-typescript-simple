import hello from '../index'

describe('src / index', () => {
  it ('hello!', () => {
    expect(hello()).toEqual('hello!')
  })
})