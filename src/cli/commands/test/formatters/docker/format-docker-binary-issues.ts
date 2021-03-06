import * as _ from 'lodash';
import { createDockerBinaryHeading } from './format-docker-binary-heading';
import { Options, TestOptions } from '../../../../../lib/types';
import { formatIssues } from '../legacy-format-issue';

export function formatDockerBinariesIssues(
  dockerBinariesSortedGroupedVulns,
  binariesVulns,
  options: Options & TestOptions,
): string[] {
  const binariesIssuesOutput = [] as string[];
  for (const pkgInfo of _.values(binariesVulns.affectedPkgs)) {
    binariesIssuesOutput.push(createDockerBinaryHeading(pkgInfo));
    const binaryIssues = dockerBinariesSortedGroupedVulns.filter(
      (vuln) => vuln.metadata.name === pkgInfo.pkg.name,
    );
    const formattedBinaryIssues = binaryIssues.map((vuln) =>
      formatIssues(vuln, options),
    );
    binariesIssuesOutput.push(formattedBinaryIssues.join('\n\n'));
  }
  return binariesIssuesOutput;
}
