<script>
import qs from 'qs'
import { onMount } from 'svelte';
import * as api from "$lib/api"
import user from '$stores/user';
import { flattenStrapiResponse } from '$lib/utils/api';
import { goto } from '$app/navigation';

export let story
let links

onMount(async () => {
  const query = qs.stringify({
    filters: {
      source: {
        id: {
          $eq: story.id,
        },
      },
    },
    populate: ['target'] 
  }, {
    encodeValuesOnly: true,
  });

  const res = await api.get(`api/links?${query}`, $user.jwt)
  links = flattenStrapiResponse(res)
  // console.log(links)
  showLinks(links)
})

function getRangeFromInt(root, start, end){
  
  // create the treewalker which will accept all textNodes
  var treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  // the array containing our textNodes
  var textNodeList = [];
  while(treeWalker.nextNode()) textNodeList.push(treeWalker.currentNode);

  var indexSizeError = 'IndexSizeError: Index or size is negative or greater than the allowed amount';
  if(start>end||start<0){console.warn(indexSizeError); return null;}
  
  var length = 0;
  var startNode, endNode, current=0,
  startPos, endPos;

  while(length<=end){
    // we'been too far ? return
    if(current>=textNodeList.length){console.warn(indexSizeError); return null;}
    // add the length of current node to our total length
    length+=textNodeList[current].textContent.length;
    // start is less than the actual total length ?
    if(start<length && !startNode){
      // then our startNode is here
      startPos = start-(length-textNodeList[current].textContent.length);
      startNode = textNodeList[current];
      }
    // same for the end
    if(end<length && !endNode){
      endPos = end-(length-textNodeList[current].textContent.length);
      endNode = textNodeList[current];
      }

    current++;
    }

  var range = document.createRange();
  range.setStart(startNode, startPos);
  range.setEnd(endNode, endPos);
  return range
  
}


const showLinks = (links) => {
  links.forEach(link => {
    const block = document.querySelector(`[data-blockid="${link.blockID}"]`)

    let range = getRangeFromInt(block, link.startOffset, link.endOffset)
    // console.log(range)

    const mark = document.createElement('span')
    mark.classList.add('soft-highlight')
    mark.classList.add('bg-opacity-25')
    mark.style.cursor = 'pointer'
    mark.onclick = () => goto(`/travelling/${link.target.data.attributes.slug}`)
    mark.appendChild(range.extractContents())

    range.insertNode(mark)
  })
}

</script>

<main>
  {#each story.submission.blocks as block}
  <p data-blockid={block.id}>
    {block.data.text}
  </p>
  {/each}
</main>