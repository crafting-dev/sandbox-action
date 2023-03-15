# sandbox-launch-action

`sandbox-launch-action` enables an easier way to construct [Crafting Sandbox Preview URL](https://docs.sandboxes.cloud/docs/git-integration).

## Quick Start

This action is designed to work together with a Github [PullRequest](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request) workflow.

If a Github workflow was not configured with your repository, you can follow this [guide](https://docs.github.com/en/actions/quickstart#creating-your-first-workflow) or the below steps to issue a simple one:

1. create a file .github/workflows/pullrequest.yaml
2. fill the file with the below content:

- replace `TEMPLATE_NAME` with the target template defined sandboxes.cloud.
- `VERSION` must be replaced with a valid version listed in this [page](https://github.com/marketplace/actions/sandbox-launch-action).

```yaml
name: PullRequest

on:
  pull_request:
    # this action will be triggered each time a PR was made against branch master.
    branches: [master]

jobs:
  build:
    name: Test
    runs-on: [self-hosted, linux, x64, shared]
    steps:
      - name: generate-preview-url # name of this step
        uses: crafting-dev/sandbox-launch-action/@latest
        with:
          # required inputs for sandbox-launch-action to specify the target template.
          template: TEMPLATE_NAME
```

3. create a PR and a preview URL would be appended to your PR.

## Advanced Usage

`sandbox-launch-action` support a bunch of other inputs to help customize the sandbox preview experience.

```yaml
- name: generate-preview-url
  uses: crafting-dev/sandbox-launch-action/@version # version should replaced with the actual one
  with:
    name: CUSTOM_SANDBOX_NAME
    template: TEMPLATE_NAME
    autoLaunch: true
    envVars: GITHUB_ACTION,GITHUB_REF...
    checkouts: workspace:path,workspace2:path2...
    autoFollow: workspace,workspace2,...
    depSnapshots: dep1:snapshot,dep2:snapshot...
    containerSnapshots: c1:snapshot,c2:snapshot...
    extraQuery: ...
```

| Inputs             | Remark   | type   | Description                                                                                                                                                                                                                  |
| ------------------ | -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| template           | required | string | name of the template for target sandbox.                                                                                                                                                                                     |
| checkouts          | optional | string | Comma-separated: workspace:path,.... This is an optional if there are multiple workspaces to be customized.                                                                                                                  |
| name               | optional | string | `CUSTOM_SANDBOX_NAME` should be replaced with the desired sandbox name. If not specified, a default name like ` <REPO>-pr-<PR-NUMBER>` would be used.                                                                        |
| autoLaunch         | optional | bool   | If true, sandbox is auto launched. Default to false.                                                                                                                                                                         |
| autoFollow         | optional | string | Comma-separated: workspace. All these workspaces would be in auto mode                                                                                                                                                       |
| depSnapshots       | optional | string | Comma-separated: name:snapshot,...                                                                                                                                                                                           |
| containerSnapshots | optional | string | Comma-separated: name:snapshot,...                                                                                                                                                                                           |
| envVars            | optional | string | Common-separated strings for [Github Action environment variables](https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables). The included ones are passed to sandbox auto launch url |
| extraQueries       | optional | string | If the built-in inputs could not meet the requirement, raw query parameters could be provided                                                                                                                                |

## Examples

## Preview

For more information about preview, please refer to this [guide](https://docs.sandboxes.cloud/docs/git-integration). Given the action is configured properly and a PR is made, a comment would be automatically appended to the PR and referencingthe preview URL.

![image](https://user-images.githubusercontent.com/501218/223888109-d9ac3567-4d33-44a5-98d9-d4599cb24ac3.png)
