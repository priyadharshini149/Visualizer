export function getInsertionSortAnimations(array)
{
    let n=array.length;
    const animations=[];
    for (let i=1;i<n;i++)
    {
        let cur=array[i];
        let j;
        animations.push([i,i,true,false]);
        animations.push([i,i,true,true]);
        for(j=i-1;j>=0 && array[j]>cur;j--)
        {
            array[j+1]=array[j];
            animations.push([j,j+1,true,false]);
            animations.push([j,j+1,true,true]);
            animations.push([j+1,array[j],false,false]);
        }
        array[j+1]=cur;
        animations.push([j+1,cur,false,false]);
    }

    return animations
}