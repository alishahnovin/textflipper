function CreateIncrementor(elementId, textArray, interval, delay)
{
	var alphabetIncrementor = new Object();
	alphabetIncrementor.Characters = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ',', '_', ':', ';', '/', '@', '!', '$', '#', '%', '&', '*', '(', ')', '-', '+', '=' ];
	alphabetIncrementor.CharacterIndexMap = [];
	alphabetIncrementor.Timer = null;
	alphabetIncrementor.DisplayCharacters = [];
	
	for(var i=0;i<15;i++)
	{
		var randomChar = Math.floor(Math.random() * alphabetIncrementor.Characters.length);
		alphabetIncrementor.CharacterIndexMap.push({ Index:randomChar, Class:randomChar==0? 'T_Space' : 'T_'+Math.floor(Math.random() * 12), Character:alphabetIncrementor.Characters[randomChar]});
	}
	
	alphabetIncrementor.Element = document.getElementById(elementId);
	alphabetIncrementor.CurrentValueIndex = -1;
	alphabetIncrementor.Interval = interval;
	alphabetIncrementor.Delay = delay;
	alphabetIncrementor.Values = textArray;
	alphabetIncrementor.SetText = function()
	{
		this.CurrentValueIndex++;
		if (this.CurrentValueIndex>=this.Values.length)
		{
			this.CurrentValueIndex=0;
		}
		this.Value = this.Values[this.CurrentValueIndex].text
		this.Link = this.Values[this.CurrentValueIndex].link;
		
		while(this.CharacterIndexMap.length<this.Value.length)
		{
			this.CharacterIndexMap.push({ Index:0, Class:'T_Space', Character:' '});
		}
		
		//handle when string is shorter...
		if (this.CharacterIndexMap.length>this.Value.length)
		{
			this.CharacterIndexMap = this.CharacterIndexMap.slice(0, this.Value.length);
		}
		
		this.Timer = setInterval(function(a) { a.Increment(); }, this.Interval, this);
	};
	alphabetIncrementor.Increment = function()
	{
		for(var i=0;i<this.Value.length;i++)
		{
			if (this.CharacterIndexMap[i].Character.toLowerCase()!=this.Value[i].toLowerCase())
			{
				this.CharacterIndexMap[i] = { Index:this.CharacterIndexMap[i].Index+1, Class:'T_'+Math.floor(Math.random() * 12), Character:this.Characters[this.CharacterIndexMap[i].Index]};
				if (this.CharacterIndexMap[i].Index>=this.Characters.length)
				{
					this.CharacterIndexMap[i] = { Index:0, Class:'T_Space', Character:' '};
				}
			}
		}

		var code = '<pre>';
		var value = '';
		for(var i=0;i<this.CharacterIndexMap.length;i++)
		{
			value += this.CharacterIndexMap[i].Character;
			if (this.CharacterIndexMap[i].Character==' ')
			{
				code += '</pre>';
			}
			code += '<span class="'+this.CharacterIndexMap[i].Class+'">'+this.CharacterIndexMap[i].Character+'</span>';
			if (this.CharacterIndexMap[i].Character==' ')
			{
				code += '<pre>';
			}
		}
		code += '</pre>';
		this.Element.innerHTML = this.Link===undefined || this.Link==''? code : '<a href="'+this.Link+'" target="_blank" title="'+this.Value+'">'+code+'</a>';
		if (value.toLowerCase()==this.Value.toLowerCase())
		{	
			clearInterval(this.Timer);
			this.Timer = null;
			setTimeout(function(a) { a.SetText(); }, this.Delay, this);
			return;
		}
	};
	alphabetIncrementor.SetText();
}
