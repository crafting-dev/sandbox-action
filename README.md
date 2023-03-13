# sandbox-launch-action

`sandbox-launch-action` enables an easier way to construct [Crafting Sandbox Preview URL](https://docs.sandboxes.cloud/docs/git-integration).

## Usage

### Installation

```yaml
- name: Setup
  uses: crafting-dev/sandbox-launch-action/@version
  with:
    name: CUSTOM_SANDBOX_NAME
    template: TEMPLATE_NAME
    autoLaunch: true
    checkouts: workspace:path,workspace2:path2...
    autoFollow: workspace,workspace2,...
    depSnapshots: dep1:snapshot,dep2:snapshot...
    containerSnapshots: c1:snapshot,c2:snapshot...
    extraQuery: ...
```

| Inputs             | Remark   | type   | Description                                                                                                                                           |
| ------------------ | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| template           | required | string | name of the template for target sandbox.                                                                                                              |
| checkouts          | required | string | Comma-separated: workspace:path,...                                                                                                                   |
| name               | optional | string | `CUSTOM_SANDBOX_NAME` should be replaced with the desired sandbox name. If not specified, a default name like ` <REPO>-pr-<PR-NUMBER>` would be used. |
| autoLaunch         | optional | bool   | If true, sandbox is auto launched. Default to false.                                                                                                  |
| autoFollow         | optional | string | Comma-separated: workspace. All these workspaces would be in auto mode                                                                                |
| depSnapshots       | optional | string | Comma-separated: name:snapshot,...                                                                                                                    |
| containerSnapshots | optional | string | Comma-separated: name:snapshot,...                                                                                                                    |
| extraQueries       | optional | string | If the built-in inputs could not meet the requirement, raw query parameters could be provided                                                         |

## Preview

For more information about preview, please refer to this [guide](https://docs.sandboxes.cloud/docs/git-integration). Given the action is configured properly and a PR is made, a comment would be automatically appended to the PR and referencingthe preview URL.

![image](https://user-images.githubusercontent.com/501218/223888109-d9ac3567-4d33-44a5-98d9-d4599cb24ac3.png)
