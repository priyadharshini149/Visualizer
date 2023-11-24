export function getBubbleSortAnimations (arr) 
{
    const animations=[]
    let n=arr.length;
    for(let i=n-1;i>=0;i--)
    {
        for(let j=0;j<i;j++)
        {
            animations.push([j,j+1,true,false]);
            animations.push([j,j+1,true,true]);
            if(arr[j]>arr[j+1])
            {
                [arr[j],arr[j+1]]=[arr[j+1],arr[j]];
                animations.push([j,arr[j],false,false]);
                animations.push([j+1,arr[j+1],false,false]);
                
            }
        }
    }

    return animations;
}