export function getSelectionSortAnimations(array)
{
    console.log(array);
    let min_idx;
    let n=array.length;
    const animations=[];
    for(let i=0;i<n-1;i++)
    {
        min_idx=i;

        for(let j=i+1;j<n;j++)
        {
            if(array[j]<array[min_idx])
            {
                min_idx=j;
            }
            // animations.push([i,j,true,false]);
            // animations.push([i,j,true,true]);
        }
            // animations.push([min_idx,i,true,false]);
            // animations.push([min_idx,i,true,true]);

            let temp=array[min_idx];
            array[min_idx]=array[i];
            array[i]=temp;
            
            animations.push([min_idx,i,true,false]);
            animations.push([min_idx,i,true,true]);
            animations.push([min_idx,array[min_idx],false,false]);
            animations.push([i,temp,false,false]);
    }
    return animations;
}