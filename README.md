TODO

### Commit messages that will trigger a release
You can check a graphic view of this: https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/release-workflow/pre-releases.md

| Commit message                                                                                                                     | Release type                                               | Version bump type | Example        |
|------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------|-------------------|----------------|
| fix: i've fixed a bug                                                                                                              | Bug Fixes                                                  | Patch             | 1.0.2 -> 1.0.3 |
| feat: i added a new feature                                                                                                        | Features                                                   | Minor             | 1.0.2 -> 1.1.0 | 
| perf: improved performance                                                                                                         | Performance Improvements                                   | Minor             | 1.0.2 -> 1.1.0 |
| feat: i added a new feature <br/><br/>BREAKING CHANGES: these changes are going to break your codee                                | Features and BREAKING CHANGES                              | Major             | 1.2.3 -> 2.0.0 |
| perf: improved performance <br/><br/>BREAKING CHANGES: these changes are going to break your code                                  | Performance Improvements and BREAKING CHANGES              | Major             | 1.2.3 -> 2.0.0 |
| perf: improved performance <br/>feat: i added a new feature <br/><br/>BREAKING CHANGES: these changes are going to break your code | Features and Performance Improvements and BREAKING CHANGES | Major             | 1.2.3 -> 2.0.0 |
| any other message                                                                                                                  | No release                                                 | -                 | -              |