import List from './components/List.svelte'

function registerComponent (component, name) {
  document.querySelectorAll(`.${CSS.escape(name)}`).forEach($el => {
    // parse the props given from the dataset
    const props = JSON.parse($el.dataset.props);
    console.log(component)
    new component({
      target: $el,
      props,
      hydrate: true
    })
  })
}

registerComponent(List, 'svelte--List')