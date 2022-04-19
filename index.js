const core = require("@actions/core");
const github = require("@actions/github");

try {
  const octokit = github.getOctokit(core.getInput("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"));
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
  octokit.actions
    .listWorkflowRuns({
      owner,
      repo,
      workflow_id: core.getInput("workflow_id"),
      status: "success",
      branch: core.getInput("branch"),
      event: "push",
    })
    .then((res) => {
      const lastSuccessCommitHash =
        res.data.workflow_runs.length > 0
          ? res.data.workflow_runs[0].head_commit.id
          : "";
      core.setOutput("commit_hash", lastSuccessCommitHash);
    })
    .catch((e) => {
      core.setFailed(e.message);
    });
} catch (e) {
  core.setFailed(e.message);
}