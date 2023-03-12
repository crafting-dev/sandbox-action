export interface CheckoutParams {
  version: string
  name: string
}

export interface WorkspaceParams {
  name: string
  auto: boolean
  checkouts: CheckoutParams[]
}

export interface DependencyParams {
  name: string
  snapshot: string
}

export interface ContainerParams {
  name: string
  snapshot: string
}

export interface SandboxParams {
  template: string
  name: string
  autoLaunch: boolean
  workspaces: WorkspaceParams[]
  dependencies: DependencyParams[]
  containers: ContainerParams[]

  repo?: string
  versionSpec?: string
  extraQuery?: string
}
