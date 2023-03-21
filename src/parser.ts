import * as core from '@actions/core'
import {
  ContainerParams,
  DependencyParams,
  EnvParams,
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
    envs: [],
    autoLaunch: true,
    mode: 'auto',
    message: ''
  }
  const name = sandboxName()
  const template = core.getInput('template', {
    required: true
  })
  const manual = core.getBooleanInput('manual')
  const workspaces = parseCheckouts(core.getInput('checkouts'))
  const containerSnapshots = parseSnapshots(core.getInput('containerSnapshots'))
  const dependencySnapshots = parseSnapshots(core.getInput('depSnapshots'))
  const envs = parseEnvironmentVariables(core.getInput('envVars'))
  const mode = core.getInput('mode')
  const message = core.getInput('message')

  const repo = currentRepository()
  const versionSpec = currentBranch()

  return {
    ...baseSandboxParams,
    name,
    template,
    workspaces,
    containers: containerSnapshots,
    dependencies: dependencySnapshots,
    envs,
    autoLaunch: !manual,
    repo,
    mode,
    versionSpec,
    message: message || 'Crafting Sandbox [Preview]($URL){:target="_blank"}'
  } as SandboxParams
}

const parseEnvironmentVariables = (params: string): EnvParams[] => {
  const envs = params.split(',')
  const envParams: EnvParams[] = []

  for (const env of envs) {
    if (process.env[env]) {
      envParams.push({
        name: env,
        value: process.env[env] || ''
      })
    }
  }

  return envParams
}

const parseCheckouts = (params: string): WorkspaceParams[] => {
  if (!params) {
    return []
  }

  const autoFollows = autoFollowWorkspaces()

  return params.split(',').map(p => {
    const items = p.split(':')
    return {
      name: items[0],
      auto: stringArrayContains(autoFollows, items[0]),
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

const sandboxName = (): string => {
  const name = core.getInput('name')
  if (name) {
    return name
  }

  const orgRepoName = currentRepository()
  const parts = orgRepoName?.split('/') || []
  let repoName = ''
  if (parts.length === 2) {
    repoName = parts[1]
  }
  repoName = repoName.replace('-', '')

  const prNumber = githubPrNumber()
  // trim repo name to ensure the full name is less than 20 characters
  // repoName-pr-prNumber
  const limit = 20 - 4 - prNumber.length
  if (repoName.length >= limit) {
    repoName = repoName.substring(0, limit - 1)
  }

  return `${repoName}-pr-${prNumber}`
}

const currentRepository = (): string => process.env.GITHUB_REPOSITORY || ''

const currentBranch = (): string => {
  return process.env.GITHUB_HEAD_REF || ''
}

const autoFollowWorkspaces = (): string[] => {
  const autoFollow = core.getInput('autoFollow')
  return autoFollow.split(',') || []
}

const stringArrayContains = (array: string[], item: string): boolean => {
  for (const i of array) {
    if (i === item) {
      return true
    }
  }

  return false
}

const githubPrNumber = (): string => {
  const githubRef = process.env.GITHUB_REF || ''
  const result = /refs\/pull\/(\d+)\/merge/g.exec(githubRef)
  if (!result) throw new Error('Reference not found.')
  const [, prNumber] = result
  return prNumber
}
