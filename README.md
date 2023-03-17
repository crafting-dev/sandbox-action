# sandbox-launch-action

`sandbox-launch-action` enables an easier way to construct [Crafting Sandbox Preview URL](https://docs.sandboxes.cloud/docs/git-integration).

## Quick Start

This action is designed to work together with a Github [PullRequest](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request) workflow.

If a Github workflow was not configured with your repository, you can follow this [guide](https://docs.github.com/en/actions/quickstart#creating-your-first-workflow) or the below steps to issue a simple one:

1. Create a file .github/workflows/pullrequest.yaml
2. Fill the file with the below content:

```yaml
name: PullRequest

on:
  pull_request:
    # this action will be triggered each time a PR was made against branch master.
    branches: [master]
    # this workflow will only be triggered when a PR is created. Following pushes do not trigger this workflow again.
    types: [opened]

jobs:
  build:
    # name of the job, you can rename this as needed
    name: Crafting Preview Link
    runs-on: [ubuntu-latest]
    env:
      # This tells the action to use the token so that it can post a comment to PR.
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    steps:
      - name: generate-preview-url # name of this step, you can rename this as needed
        uses: crafting-dev/sandbox-launch-action@0.4.1 # update the version as needed
        with:
          # required inputs for sandbox-launch-action to specify the target template.
          template: TEMPLATE_NAME
```

- replace `TEMPLATE_NAME` with the target template defined in Crafting (https://sandboxes.cloud).
- env `GITHUB_TOKEN` must be provided, as the action depends on it to append a comment.

3. Create a PR and a preview URL would be appended to your PR:

![image](https://user-images.githubusercontent.com/501218/223888109-d9ac3567-4d33-44a5-98d9-d4599cb24ac3.png)

## Advanced Usage

`sandbox-launch-action` support a bunch of other inputs to help customize the sandbox preview experience.

```yaml
- name: generate-preview-url
  uses: crafting-dev/sandbox-launch-action@version # version should replaced with the actual one
  with:
    # required string.
    template: TEMPLATE_NAME
    # optional string, name of desired sandbox. If not provided, a default name like ` <REPO>-pr-<PR-NUMBER>` would be used.
    name: CUSTOM_SANDBOX_NAME
    # optional boolean, default to true. The created sandbox url would launch the sandbox automatically.
    autoLaunch: true
    # optional string, default to auto.
    mode: auto
    # optinoal, comma separated string, a list of Github Action related environment variables that would be passed in as sandbox env.
    envVars: GITHUB_ACTION,GITHUB_REF...
    # optional, comma separated string, a list of snapshots customization for dependencies. Each entry is of format dependency-name:snapshot-name.
    depSnapshots: dep1:snapshot,dep2:snapshot...
    # optional, comma separated string, a list of snapshots customization for containers. Each entry is of format container-name:snapshot-name.
    containerSnapshots: c1:snapshot,c2:snapshot...
    # optional, raw query parameters for sandbox auto launch.
    extraQuery: ...
```

The full references of all inputs are listed in the below table:

| Inputs             | Remark   | type   | Description                                                                                                                                                                                                                  |
| ------------------ | -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| template           | required | string | name of the template for target sandbox.                                                                                                                                                                                     |
| name               | optional | string | `CUSTOM_SANDBOX_NAME` should be replaced with the desired sandbox name. If not specified, a default name like ` <REPO>-pr-<PR-NUMBER>` would be used.                                                                        |
| autoLaunch         | optional | bool   | If true, sandbox is auto launched. Default to true.                                                                                                                                                                          |
| mode               | optional | string | Workspace auto follow mode.                                                                                                                                                                                                  |
| depSnapshots       | optional | string | Comma-separated: name:snapshot,...                                                                                                                                                                                           |
| containerSnapshots | optional | string | Comma-separated: name:snapshot,...                                                                                                                                                                                           |
| envVars            | optional | string | Common-separated strings for [Github Action environment variables](https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables). The included ones are passed to sandbox auto launch url |
| extraQueries       | optional | string | If the built-in inputs could not meet the requirement, raw query parameters could be provided                                                                                                                                |

## Examples

Refer to [examples folder](examples/) for more details.

## Preview

For more information about preview, please refer to this [guide](https://docs.sandboxes.cloud/docs/git-integration).
