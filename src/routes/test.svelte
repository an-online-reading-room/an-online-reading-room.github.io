<script>

import * as api from '$lib/api'
import user from '$stores/user';
import { onMount } from 'svelte';

onMount(async () => {
  const res = await api.get(
    'api/stories?populate[0]=users_permissions_user&populate[1]=targetLinks',
    $user.jwt
  )

  console.log(res)

})


</script>