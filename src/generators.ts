import {SandboxParams} from './types'

export const generateSandboxLaunchUrl = async (
  baseUrl: string,
  params: SandboxParams
): Promise<string> => {
  const queryParams = await generateSandboxLaunchQueryParameters(params)
  const url = `${baseUrl}/create?${queryParams}`
  return url
}

export const generateSandboxLaunchQueryParameters = async (
  params: SandboxParams
): Promise<string> => {
  const templateQueryParam = `template=${params.template}`
  const nameQueryParam = `sandbox_name=${params.name}`
  const autoLaunchParam = `autolaunch=${params.autoLaunch}`

  const containersQueryParams = params.containers.map(
    container => `container_${container.name}_snapshot=${container.snapshot}`
  )

  const dependenciesQueryParams = params.dependencies.map(
    dependency => `dep_${dependency.name}_snapshot=${dependency.snapshot}`
  )

  const checkoutsQueryParams = params.workspaces.flatMap(workspace => {
    return workspace.checkouts.map(
      co => `ws_${workspace.name}_co_${co.name}_version=${co.version}`
    )
  })

  const workspaceModesQueryParams = params.workspaces
    .filter(ws => ws.auto)
    .map(workspace => `ws_${workspace.name}_mode=auto`)

  let queryParams = [
    templateQueryParam,
    nameQueryParam,
    autoLaunchParam,
    ...containersQueryParams,
    ...dependenciesQueryParams,
    ...checkoutsQueryParams,
    ...workspaceModesQueryParams
  ].join('&')

  if (params.extraQuery) {
    queryParams = `${queryParams}&${params.extraQuery}`
  }

  if (params.repo) {
    queryParams = `${queryParams}&repo=${params.repo}`
  }

  if (params.versionSpec) {
    queryParams = `${queryParams}&version_spec=${params.versionSpec}`
  }

  return new Promise(resolve => {
    resolve(queryParams)
  })
}
