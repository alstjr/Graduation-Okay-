import React from 'react';

const KyRecommendRow = ({KyRecommend}) => {
    return(
           
                            <tr className='KyRecommendWrapper'>
                                <td className="grade_table_td rank_width"></td>
                                <td className="grade_table_td name_width">{KyRecommend.kyName1}</td>
                                <td className="grade_table_td ky_width">{KyRecommend.kyType}</td>
                                <td className="grade_table_td core_width">{KyRecommend.kyCore}</td>
                                <td className="grade_table_th gradenum_width" >{KyRecommend.kyCredit}</td>
                                <td className="grade_table_td num_width">{KyRecommend.kyCount}</td>
                            </tr>
    )
}

export default KyRecommendRow;