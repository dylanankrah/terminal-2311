<script>
  import { theme } from '../stores/theme';
  let hostname = '2311';  // window.location.hostname;
</script>

<h1 class="font-bold flex">
  <span style={`color: ${$theme.yellow};`}>player</span>
  <span style={`color: ${$theme.white}`}>@</span>
  <span style={`color: ${$theme.green}`}>{hostname}</span>
  <span style={`color: ${$theme.white}`}>:~$</span>
</h1>
