# node-csv-loader

## Installation

Install the package using npm:

```bash
npm install @neurodevs/node-csv-loader
```

## Usage

### Basic Usage

To load a CSV file:

```typescript
import { CsvLoaderImpl } from '@neurodevs/node-csv-loader'

const loader = CsvLoaderImpl.Create()

// In an async function
const data = await loader.load('/path/to/csv')
```

### Disable Path Validation

This class automatically performs the following validations on the path you pass to the load method:

- Asserts that you passed a path
- Asserts that the file exists at the path
- Asserts that the file extension is '.csv'

To turn off path validation (e.g., when you are certain of the file's existence or extension):

```typescript
const loader = CsvLoaderImpl.Create({ shouldValidatePath: false })
```

## Testing

You can use the following test doubles for unit testing purposes:

```typescript
import { FakeCsvLoader, SpyCsvLoader } from '@neurodevs/node-csv-loader'

// Use FakeCsvLoader for simulating inputs and outputs in tests
CsvLoaderImpl.Class = FakeCsvLoader

// Use SpyCsvLoader to test real behavior with enhanced internal visibility
CsvLoaderImpl.Class = SpyCsvLoader

const loader = CsvLoaderImpl.Create()
```

- **`FakeCsvLoader`**: Provides a fake implementation to simulate CSV loading for testing.
- **`SpyCsvLoader`**: Wraps the real implementation with enhanced visibility for inspecting internal behavior during testing.
