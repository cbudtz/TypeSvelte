<script lang="ts">
    let formInput ={name:""}
    let files: any;
    let uploadresult: Promise<Response> | null = null;


	async function upload() {
        let data = new FormData();
        data.append("file", files[0]);
        data.append("name", formInput.name);
        uploadresult = fetch("/api/todos", {
            method: "POST",
            body: data,
        });
        const res = await uploadresult; 
        const json = await res.json();
        return json.body.id
	}
</script>

<input bind:value={formInput.name}>
<input type="file" bind:files>
<div>{formInput.name}</div>
{#if files}
{files[0]}
<button on:click={()=>uploadresult= upload()}>Upload</button>
{/if}

{#await uploadresult then id}
    {#if uploadresult}
    <div>Upload successful + {id}</div>
    {/if}
{:catch error}
    <div>Upload failed: {error}</div>
{/await}
    


