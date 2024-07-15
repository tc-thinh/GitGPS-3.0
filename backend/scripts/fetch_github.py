import collections
import requests
import json


def fetch_root_data(git_username: str, git_repo: str) -> list:
    url = f"https://api.github.com/repos/{git_username}/{git_repo}/contents"  # /commits to get commits info
    print(url)
    response = requests.get(url)  # 0.25 - 1s call 4 requests
    response = clean_response(response.json())
    return response


# sample return data: {'name': ..., 'type': {'type': 'file' or 'dir', 'url': ..., 'children': []}, 'download_url': ...}
def clean_response(data: list) -> list:
    for index, file in enumerate(data):
        data[index] = {
            "name": file["name"],
            "type": {"type": file["type"], "url": file["url"]},
            "children": [],
            "download_url": file["download_url"],
        }
    return data


def fetch_and_populate_children(node: dict) -> None:
    url = node["type"]["url"]
    response = requests.get(url)
    response = clean_response(response.json())
    node["children"] = response


def bfs_fetch_and_populate(git_username, git_repo):
    root = fetch_root_data(git_username, git_repo)
    queue = collections.deque([root])

    while queue:
        current_node = queue.popleft()  # current_node is a list of dictionaries
        for child in current_node:
            if child["type"]["type"] == "dir":
                fetch_and_populate_children(child)
                queue.append(child["children"])

    return root


# Create a FastAPI endpoint - receive a GitHub username and repo name, and return the JSON object
# between each api call
# Test
# Current issue: There are limits to the number of GitHub API requests that can be made
test_username = "2023-opportunity-hack"
test_repo = "SouL--DigitalRecordsManagementforMuseumsandHistoricalSites"
fetched_repo = bfs_fetch_and_populate(test_username, test_repo)
repo_json = {"data": fetched_repo}
json_object = json.dumps(repo_json, indent=2)
with open(f"{test_username}_{test_repo}.json", "w") as outfile:
    outfile.write(json_object)
