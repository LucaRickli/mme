<script lang="ts">
  export let err: unknown
</script>

{#if err instanceof Error}

<section class="prose p-4">
  <h1 class="text-red-600">
    Critical error!
  </h1>

  <table class="table-auto">
    <tbody>
      <tr>
        <th>Kind</th>
        <td>{err.name}</td>
      </tr>
      <tr>
        <th>Message</th>
        <td>{err.message}</td>
      </tr>
      <tr>
        <th>Cause</th>
        <td>{JSON.stringify(err?.cause) || 'unkown'}</td>
      </tr>
    </tbody>
  </table>
  
  {#if err.stack}
    <h2>Stacktrace</h2>
    <code class="m-2">{err.stack}</code>
  {/if}
</section>

{:else}


<slot name="title">
  <h1 class="font-semibold text-2xl mb-2">Critical error!</h1>
</slot>

<p>{JSON.stringify(err, null, 2)}</p>
{/if}

