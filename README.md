# sandbox-launch-action

`sandbox-launch-action` enables an easier way to construct [Crafting Sandbox Preview URL](https://docs.sandboxes.cloud/docs/git-integration).  

## Usage

### Installation

```yaml
- name: Setup
  uses: crafting-dev/sandbox-launch-action/@version
  with:
    name: CUSTOM_SANDBOX_NAME
    launch: './.sandbox/launch.yaml'
```

`CUSTOM_SANDBOX_NAME` should be replaced with the desired sandbox name. 

By default, file `./.sandbox/launch.yaml` is used as the sandbox launch parameters. You can re-specify it by update the corresponding `launch` inputs. 

The launch file is a YAML file of sandbox launch parameters which is described in the later section.  

### Launch Parameters

```yaml
# template name
template: "template-name"
# A flag indicate the target sandbox will be automatically launched.
autoLaunch: true,
# an array of workspaces parameters
workspaces:
  - name: workspace
    # A flag indicates whether to keep track of updates in the upstream Git repository.
    auto: false
    # an array of checkouts under this workspace
    checkouts:
      - name: src # path of the checkout, e.g. ~/src is mapped to src.
        version: $BRANCH # values can be branch name or commit number.
# an array of dependencies parameters
dependencies:
  - name: dep
    # snapshot override for dependency
    snapshot: snapshot-name
# an array of containers parameters
containers:
  - name: container
    # snapshot override for container
    snapshot: snapshot-name
```

### Built-in variables
`$BRANCH` is a built-in variable which is set to the current branch in the Github Action context. e.g. In a PR, it would be set to the PR's source branch.

## Preview

For more information about preview, please refer to this [guide](https://docs.sandboxes.cloud/docs/git-integration). Given the action is configured properly and a PR is made, a comment would be automatically appended to the PR and referencingthe preview URL.

![image](https://user-images.githubusercontent.com/501218/223888109-d9ac3567-4d33-44a5-98d9-d4599cb24ac3.png)


