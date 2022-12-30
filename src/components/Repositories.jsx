import axios from "axios";
import { Fragment } from "react";
import { useQuery } from "react-query";

export default function Repositories() {
  const { isLoading, isError, data, error, refetch } = useQuery(["repo"], () => 
    axios
    .get("https://api.github.com/users/rhenaldkarrel/repos")
    .then(res => res.data)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error occurred: " + error.message;

  return (
    <>
      {data.map(repo => (
        <Fragment key={repo.id}>
          <ul>
            <li>
              <a
                href={repo.clone_url}>
                {repo.name}
              </a>
            </li>
          </ul>
        </Fragment>
      ))}
      <button type="button" onClick={refetch}>
        Fetch again
      </button>
    </>
  )
}