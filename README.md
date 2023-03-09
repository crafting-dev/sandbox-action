# sandbox-launch-action

`sandbox-launch-action` enables an easier way to construct Crafting Sandbox Preview url. 

## Usage

```yaml
- name: Setup
  uses: crafting-dev/sandbox-launch-action/@version
  with:
    name: custom-sandbox-name
    launch: './.sandbox/launch.yaml'
```

`custom-sandbox-name` should be replaced with the desired sandbox name. 

By default, file `./.sandbox/launch.yaml` is used as the sandbox launch parameters. You can re-specify it by update the corresponding `launch` inputs. 

## Launch Parameter

```yaml
template: "template-name"
autoLaunch: true,
workspaces:
  - name: workspace
    auto: false
    checkouts:
      - name: src
        version: $BRANCH
dependencies:
  - name: dep
    snapshot: snapshot-name
containers:
  - name: container
    snapshot: snapshot-name

```

`$BRANCH` is a built-in variable which is set to the current branch in the Github Action context. e.g. In a PR, it would be set to the PR's source branch.

## Preview

For more information about preview, please refer to this [guide](https://docs.sandboxes.cloud/docs/git-integration). Given the action is configured properly and a PR is made, a comment would be automatically appended to the PR and referencingthe preview URL.

![image](https://user-images.githubusercontent.com/501218/223888109-d9ac3567-4d33-44a5-98d9-d4599cb24ac3.png)


