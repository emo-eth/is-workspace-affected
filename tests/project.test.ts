import path from 'node:path';

import { Project } from '@/src/project';

// Constants
const TEST_PROJECT_ROOT = path.join(__dirname, 'project');

// Tests
describe('Project.loadProject', () => {
  it('should return the test-project Project', async () => {
    const prj = await Project.loadProject(TEST_PROJECT_ROOT);

    expect(prj.root).toBe(TEST_PROJECT_ROOT);
    expect(prj.name).toBe('test-project');
  });
});

describe('Project.getWorkspace', () => {
  let prj: Project;

  beforeEach(async () => {
    prj = await Project.loadProject(TEST_PROJECT_ROOT);
  });

  // Tests
  it('should return project\'s test-a workspace', () => {
    expect(prj.getWorkspace('test-a'))
      .toEqual(expect.objectContaining({
        name: 'test-a',
        root: path.join(TEST_PROJECT_ROOT, 'test-a')
      }));
  });

  it('should return null', () => {
    expect(prj.getWorkspace('does-not-exists'))
      .toBeNull();
  });
});
