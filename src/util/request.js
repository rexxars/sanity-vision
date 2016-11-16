export default (comp, opts, key) => {
  return comp.context.client.requestObservable(opts)
    .filter(event => event.type === 'response')
    .map(event => event.body)
    .subscribe({
      next: val => comp.setState({[key]: val}),
      error: error => comp.setState({error})
    })
}
