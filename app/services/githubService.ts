type GithubServiceOptions = {
  username: string;
}

export function createGithubService(options: GithubServiceOptions) {

  const { username } = options;
  const token = process.env.GITHUB_API_TOKEN;

  return {
    getUser: async () => {
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }

      return response.json()
    },
    getRepos: async () => {
      const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch repos')
      }

      return response.json()  
    }
  }
}