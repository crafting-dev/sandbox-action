import * as core from '@actions/core'
import {
  ContainerParams,
  DependencyParams,
  SandboxParams,
  WorkspaceParams
} from './types'

export const parseParams = (): SandboxParams => {
  const baseSandboxParams: SandboxParams = {
    template: '',
    name: '',
    workspaces: [],
    dependencies: [],
    containers: [],
    autoLaunch: false
  }
  const name = core.getInput('name')
  const template = core.getInput('template')
  const autoLaunch = core.getBooleanInput('autoLaunch')
  const workspaces = parseCheckouts(core.getInput('checkouts'))
  const containerSnapshots = parseSnapshots(core.getInput('containerSnapshots'))
  const dependencySnapshots = parseSnapshots(core.getInput('depSnapshots'))

  const repo = core.getInput('repo')
  const versionSpec = currentBranch()

  return {
    ...baseSandboxParams,
    name,
    template,
    workspaces,
    containers: containerSnapshots,
    dependencies: dependencySnapshots,
    autoLaunch,
    repo,
    versionSpec
  } as SandboxParams
}

const parseCheckouts = (params: string): WorkspaceParams[] => {
  if (!params) {
    return []
  }

  const autoFollow = core.getBooleanInput('autoFollow')

  return params.split(',').map(p => {
    const items = p.split(':')
    return {
      name: items[0],
      auto: autoFollow,
      checkouts: [
        {
          name: items[1],
          version: currentBranch()
        }
      ]
    }
  })
}

const parseSnapshots = (
  params: string
): DependencyParams[] | ContainerParams[] => {
  if (!params) {
    return []
  }

  return params.split(',').map(p => {
    const items = p.split(':')
    return {
      name: items[0],
      snapshot: items[1]
    }
  })
}

const currentBranch = (): string => {
  return process.env.GITHUB_HEAD_REF || ''
}
