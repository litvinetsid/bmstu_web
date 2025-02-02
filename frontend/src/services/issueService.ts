const API_URL = `${import.meta.env.VITE_API_URL}/issues`;

export const fetchIssues = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addIssueToRefueller = async (refuellerId: string, issueId: string) => {
  const response = await fetch(`${API_URL}/refuellers/${refuellerId}/issues`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ issueId }),
  });
  return response.json();
};

export const removeIssueFromRefueller = async (refuellerId: string, issueId: string) => {
  const response = await fetch(`${API_URL}/refuellers/${refuellerId}/issues/${issueId}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const createIssue = async (issue: { name: string; fuel: string; volume: string; number: string }) => {
  const randomMultiplier = Math.random() * (0.95 - 0.3) + 0.3;
  const adjustedVolume = (parseFloat(issue.volume) * randomMultiplier).toFixed(1);
  issue.volume = adjustedVolume.toString();
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(issue),
  });
  return response.json();
};

export const deleteIssueService = async (issueId: string) => {
  const response = await fetch(`${API_URL}/${issueId}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const updateIssueService = async (issueId: string, issue: { name: string; fuel: string; volume: string; number: string }) => {
  const randomMultiplier = Math.random() * (0.95 - 0.3) + 0.3;
  const adjustedVolume = (parseFloat(issue.volume) * randomMultiplier).toFixed(1);
  issue.volume = adjustedVolume.toString();
  const response = await fetch(`${API_URL}/${issueId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(issue),
  });
  return response.json();
};