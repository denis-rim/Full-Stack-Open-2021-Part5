import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog/>', () => {
  const blog = {
    title: 'Test blog title',
    author: 'Test blog author',
    url: 'Test blog url',
    likes: 1,
    user: [{ username: 'Denis', name: 'Denis M' }],
  }

  const user = [
    {
      username: 'Denis',
      name: 'Denis M',
    },
  ]

  let component

  beforeEach(() => (component = render(<Blog blog={blog} user={user} />)))

  test('render its title', () => {
    const div = component.container.querySelector('div')

    console.log(prettyDOM(div))

    expect(component.container).toHaveTextContent('Test blog title')
  })

  test('render its title', () => {
    expect(component.container).toHaveTextContent('Test blog title')
  })

  test('not render its url', () => {
    expect(component.container).not.toHaveTextContent('Test blog url')
  })

  test('not render its likes by default', () => {
    expect(component.container).not.toHaveTextContent('1')
  })

  test('blogs url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('Test blog url')

    expect(component.container).toHaveTextContent('1')
  })
})
