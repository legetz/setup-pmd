# PMD - Salesforce APEX code analyzer action

- This action allows to use [PMD Source Code Analyzer](https://pmd.github.io/) from GitHub Actions
- You can easily validate whole Apex codebase every time when push happens against any/certain branches
- Latest version uses PMD `7.1.0`

## Example usage

- Run PMD rules defined in `pmd-rules.xml`
  - Custom ruleset should be hosted at your project repository
  - Check `pmd-rules-example.xml` if you are unfamiliar with [PMD custom ruleset definition](https://pmd.github.io/latest/pmd_userdocs_making_rulesets.html)

```yaml
name: scan-code
on: [push]
jobs:
  apex:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      with:
        fetch-depth: 0
    - name: Setup PMD
      uses: legetz/setup-pmd@7.1.0
    - name: APEX full scan
      run: pmd check --dir ./force-app/main/default/classes/*.cls --rulesets ./pmd-rules.xml -f text
```

- Run only PMD `design.xml` default rules:

```yaml
name: scan-code
on: [push]
jobs:
  apex:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      with:
        fetch-depth: 0
    - name: Setup PMD
      uses: legetz/setup-pmd@7.1.0
    - name: APEX full scan for design rules only
      run: pmd check --dir ./force-app/main/default/classes -R category/apex/design.xml -f text
```

- You might also use pull-request driven action by Mitchell Spano (https://github.com/mitchspano/sfdx-scan-pull-request) in order to validate only added/changed Apex classes:
```yaml
name: scan-delta-code
on:
  pull_request:
    types: [opened, reopened, synchronize]
jobs:
  apex:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      with:
        fetch-depth: 0
    - name: APEX delta scan
      uses: mitchspano/sfdx-scan-pull-request@v0.1.16
      with:
        pmdconfig: pmd-rules.xml
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
``````
