import { useQuery } from "@tanstack/react-query"
import { getUrlAnalysis } from "../../services/url"

const DetailedAnalysisPane = ({ path }) => {
    const fetchUrlAnalysis = useQuery({
        queryKey: ['fetchUrlAnalysis'],
        queryFn: () => getUrlAnalysis({ path, region: 'none' }),
        refetchOnWindowFocus: false
    })
    const urlAnalysis = fetchUrlAnalysis.data
    if (!urlAnalysis) {
        return <p>loading...</p>
    }
    console.log(urlAnalysis)
    return (
        <p>hello</p>
    )
}

export default DetailedAnalysisPane