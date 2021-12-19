<!-- start title -->
<!-- end title -->
<!-- start description -->
<!-- end description -->
<!-- start contents -->
<!-- end contents -->
<!-- start usage -->
<!-- end usage -->
<!-- start inputs -->
<!-- end inputs -->
<!-- start outputs -->
<!-- end outputs -->
<!-- start examples -->
### Example usage to make a commit to a protected branch and always re-enable include admins
```yaml
on: [push]

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: A job to say hello
    steps:
      - uses: actions/checkout@v2
      - uses: swarm-io/action-branch-protection-bot@init
        with:
          token: ${{ secrets.GIT_RUNNER_TOKEN }}
          include-admins: false
      - run: |
          echo "hello" >> hello.txt
      - uses: stefanzweifel/git-auto-commit-action@v4
      - uses: swarm-io/action-branch-protection-bot@init
        if: always()  # Force to always run this step to ensure "include administrators" is always turned back on
        with:
          token: ${{ secrets.GIT_RUNNER_TOKEN }}
          include-admins: true
```
<!-- end examples -->
<!-- start [.github/ghdocs/examples/] -->
<!-- end [.github/ghdocs/examples/] -->
