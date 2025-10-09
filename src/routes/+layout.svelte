<script>
    export const prerender = true;
    export const ssr = false;
    import "../app.css";
    import Navbar from './components/navbar.svelte';
</script>

  <main>
    <Navbar />
    <slot></slot>
  </main>