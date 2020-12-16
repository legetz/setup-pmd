# PMD - Salesforce APEX code analyzer action

- This action allows to use PMD Source Code Analyzer from GitHub Actions
- Latest version uses PMD `6.30.0`

## Example usage

- Run PMD rules defined in `pmd-rules.xml`
  - Custom ruleset should be hosted at your project repository
  - Check `pmd-rules-example.xml` if you are unfamiliar with [PMD custom ruleset definition](https://pmd.github.io/latest/pmd_userdocs_making_rulesets.html)

```yaml
name: validate-apex-code
on: [push]
jobs:
  check-apex:
    runs-on: ubuntu-latest
    steps:
      - name: Check APEX
        uses: legetz/setup-pmd@6.30.0
      - run: pmd -language apex -dir . -rulesets ./pmd-rules.xml -f text
```

- Run PMD `design.xml` default rules:

```yaml
name: validate-apex-code
on: [push]
jobs:
  check-apex:
    runs-on: ubuntu-latest
    steps:
      - name: Check APEX
        uses: legetz/setup-pmd@6.30.0
      - run: pmd -d ./force-app/main/default/classes -R category/apex/design.xml -f text
```
