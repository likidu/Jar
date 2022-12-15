<script lang="ts">
  import { querystring, replace } from 'svelte-spa-router';

  import InputRow from '@/ui/components/form/InputRow.svelte';
  import SelectRow from '@/ui/components/form/SelectRow.svelte';
  import Typography from '@/ui/components/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';

  import svelteLogo from '@/assets/svelte.svg';
  import Button from '@/ui/components/buttons/Button.svelte';

  import { Forum } from '@/lib/configs/config';
  import { Jar } from '@/lib/services';

  let params: URLSearchParams;

  let title = 'Step 1';
  let forum = Forum.HIPDA;
  let username = 'likki';
  let password = 'punkt..1';

  const Step = {
    Login: 'login',
  };

  $: params = new URLSearchParams($querystring);

  async function login() {
    await Jar.login({ username, password, forum });
    return true;
  }

  function next(step: Number = 1) {
    if (!params.get('step')) {
      title = 'Step 2';
      replace(`/login?step=${Step.Login}`);
    }
    if (params.get('step') === Step.Login) {
      login();
    }
  }
</script>

<View>
  <ViewHeader {title} />
  <ViewContent>
    {#if !params.get('step')}
      <div class="flex flex-col items-center justify-center">
        <h2>Jar</h2>
        <img src={svelteLogo} class="w-32 h-32" alt="Svelte Logo" />
      </div>
      <Button
        title="Login with SMS"
        navi={{
          itemId: 'START',
          onSelect: async () => next(),
        }}
      />
    {:else if params.get('step') === Step.Login}
      <Typography align="center" padding="both">Enter your forum credentials</Typography>
      <SelectRow
        label="Forum"
        value={forum}
        options={[
          { id: Forum.HIPDA, label: '4D4Y' },
          { id: Forum.CHIPHELL, label: 'Chiphell' },
        ]}
        onChange={(val) => (forum = Forum[val.toString()])}
      />
      <InputRow label="User Name" value={username} placeholder="User name..." onChange={(val) => (username = val)} />
      <InputRow label="Password" value={password} placeholder="Password..." onChange={(val) => (password = val)} />
      <Button
        title="Login"
        navi={{
          itemId: 'LOGIN',
          onSelect: async () => next(),
        }}
      />
    {/if}
  </ViewContent>
</View>
