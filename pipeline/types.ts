export type Purpose = `sprite` | `background` | `sound` | `song`

export type ImportedCommonPurpose = {
  readonly sprite: {}
  readonly background: {
    readonly ids: number[]
  }
  readonly sound: {}
  readonly song: {
    readonly ids: number[]
  }
}

export type ImportedPurpose = {
  readonly sprite: {
    readonly segments: ReadonlyArray<string>
    readonly pngPath: string
    readonly sheetX: number
    readonly sheetY: number
    readonly width: number
    readonly height: number
    readonly offsetX: number
    readonly offsetY: number
  }
  readonly background: {
    readonly segments: ReadonlyArray<string>
    readonly id: number
    readonly width: number
    readonly height: number
    readonly offsetX: number
    readonly offsetY: number
  }
  readonly sound: {
    readonly segments: ReadonlyArray<string>
    readonly rawPath: string
    readonly channels: 1 | 2
  }
  readonly song: {
    readonly segments: ReadonlyArray<string>
    readonly id: number
  }
}

export type ImportedPurposeFile<TPurpose extends Purpose> = {
  readonly common: ImportedCommonPurpose[TPurpose]
  readonly byFile: { [file: string]: ReadonlyArray<ImportedPurpose[TPurpose]> }
}

export type PurposeExtensionType = {
  readonly sprite: `png` | `ase` | `aseprite`
  readonly background: `png` | `ase` | `aseprite`
  readonly sound: `wav` | `flac`
  readonly song: `wav` | `flac`
}

export const PurposeExtensionValue: {
  readonly [TPurpose in Purpose]: ReadonlyArray<PurposeExtensionType[TPurpose]>
} = {
  sprite: [`png`, `ase`, `aseprite`],
  background: [`png`, `ase`, `aseprite`],
  sound: [`wav`, `flac`],
  song: [`wav`, `flac`]
}

export type PurposeImplementation = {
  readonly [TPurpose in Purpose]: {
    delete(
      common: ImportedCommonPurpose[TPurpose],
      content: ContentReference<TPurpose, PurposeExtensionType[TPurpose]>,
      imported: ReadonlyArray<ImportedPurpose[TPurpose]>
    ): Promise<void>
    import(
      common: ImportedCommonPurpose[TPurpose],
      content: ContentReference<TPurpose, PurposeExtensionType[TPurpose]>
    ): Promise<ReadonlyArray<ImportedPurpose[TPurpose]>>
    pack(
      imported: ReadonlyArray<ImportedPurpose[TPurpose]>
    ): Promise<ReadonlyArray<Packed>>
  }
}

export type Packed = {
  readonly segments: ReadonlyArray<string>
  readonly code: string
}

export const stateVersion = 3

export type State = {
  firstRun: boolean
  readonly version: number
  contentVersions: {
    readonly [filename: string]: string
  }
  readonly packedContentMetadata: {
    [TPurpose in Purpose]: ReadonlyArray<Packed>
  }
}

export type ContentReference<TPurpose extends string, TExtension extends string> = {
  readonly source: string
  readonly segments: string[]
  readonly purpose: TPurpose
  readonly extension: TExtension
}

export type ResolvedContentReference<TPurpose extends Purpose> = ContentReference<TPurpose, PurposeExtensionType[TPurpose]>

export type MetadataContent = {
  readonly source: string
  readonly name: string
  readonly extension: string
}
