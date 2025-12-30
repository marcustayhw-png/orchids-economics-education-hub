import { db } from '@/db';
import { flashcards } from '@/db/schema';

async function main() {
    const currentTimestamp = new Date().toISOString();
    
    const sampleFlashcards = [
        {
            question: 'What are the five key characteristics of perfect competition?',
            answer: `The five key characteristics of perfect competition are:

1. **Many buyers and sellers**: There are numerous firms and consumers in the market, each with a negligible market share. No single firm or buyer can influence market price.

2. **Homogeneous product**: All firms produce identical products that are perfect substitutes. Consumers view all products as exactly the same with no brand differentiation.

3. **No barriers to entry or exit**: Firms can freely enter or leave the market in the long run with no legal, financial, or technological restrictions. There are no sunk costs or regulatory obstacles.

4. **Perfect information**: All market participants have complete knowledge about prices, quality, production methods, and market conditions. There is no information asymmetry.

5. **Price taker behavior**: Individual firms must accept the market price determined by industry supply and demand. They cannot set their own prices as any attempt to charge above market price results in zero sales.

**Real-world approximation**: Singapore's wholesale vegetable market at Pasir Panjang comes close to perfect competition, with many sellers offering similar vegetables, low barriers for new vendors, and prices largely determined by overall supply and demand. However, pure perfect competition rarely exists in reality due to product differentiation and information gaps.`,
            level: 'JC',
            category: 'H2 Economics',
            topic: 'Market Structure',
            difficulty: 'medium',
            economicsType: 'Micro',
            chapter: 'Market Structure',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            question: 'Why are firms in perfect competition described as price takers? Explain with reference to the demand curve.',
            answer: `Firms in perfect competition are price takers because:

**1. Negligible market share**: Each firm produces an infinitesimally small proportion of total market output. For example, a single fish farmer in Singapore's aquaculture industry produces only a tiny fraction of total fish supply.

**2. Perfect substitutes**: Products are homogeneous, so consumers will immediately switch to competitors if one firm charges even slightly above market price. There is no brand loyalty or product differentiation.

**3. Horizontal demand curve**: The firm faces a perfectly elastic demand curve (horizontal line) at the market equilibrium price. This means:
- At price P*, the firm can sell any quantity
- At any price above P*, quantity demanded falls to zero instantly
- The firm has no incentive to price below P* as it can sell all output at P*

**Diagram description**:
- Market diagram (left): Normal downward-sloping demand (D) and upward-sloping supply (S) curves intersect at equilibrium price P* and quantity Q*
- Firm diagram (right): Horizontal demand curve at price P*, labeled as AR = MR = P*
- The firm's demand curve is perfectly elastic (elasticity = infinity)

**Mathematical relationship**: 
- Average Revenue (AR) = Price = P*
- Marginal Revenue (MR) = Price = P*
- Therefore: AR = MR = P* (demand curve)

**Singapore example**: In the foreign exchange market, a small forex trader in Singapore must accept the prevailing SGD/USD exchange rate. They cannot influence the rate as their transaction volume is insignificant compared to daily global forex trading of over $6 trillion.`,
            level: 'JC',
            category: 'H2 Economics',
            topic: 'Market Structure',
            difficulty: 'medium',
            economicsType: 'Micro',
            chapter: 'Market Structure',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            question: 'Explain the firm\'s demand curve in perfect competition and the relationship between price, average revenue, and marginal revenue.',
            answer: `In perfect competition, the firm's demand curve has unique characteristics:

**Shape and position**: The demand curve is perfectly horizontal (perfectly elastic) at the market-determined price P*. This represents infinite price elasticity of demand.

**Triple identity - AR = MR = P***:

1. **Price (P)**: The market-determined equilibrium price that the firm must accept
2. **Average Revenue (AR)**: Total revenue divided by quantity = (P × Q) / Q = P
3. **Marginal Revenue (MR)**: Additional revenue from selling one more unit = P

Since price is constant at P* for all quantities sold:
- Every unit sold generates revenue of P*
- Average revenue per unit = P*
- Additional revenue from each extra unit = P*
- Therefore: AR = MR = P*

**Graphical representation**:
- Horizontal line at price level P*
- This single line simultaneously represents demand curve, AR curve, and MR curve
- Labeled as "D = AR = MR = P*"

**Contrast with other market structures**:
- In monopoly: MR < AR < P (MR curve below AR curve)
- In perfect competition: MR = AR = P (all three are identical)

**Practical implication**: A perfectly competitive firm can sell any quantity at price P* without affecting the price. If they try to charge $10.01 when market price is $10.00, they sell nothing. If they charge $9.99, they unnecessarily sacrifice revenue.

**Real-world example**: A commodity trader in Singapore selling crude palm oil faces a near-perfectly elastic demand curve at the prevailing international market price. Whether they sell 100 or 1,000 tonnes, the price per tonne remains at the market rate (e.g., RM 3,800 per tonne).`,
            level: 'JC',
            category: 'H2 Economics',
            topic: 'Market Structure',
            difficulty: 'medium',
            economicsType: 'Micro',
            chapter: 'Market Structure',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            question: 'Explain the short-run equilibrium of a perfectly competitive firm earning supernormal profit. Include a detailed diagram description.',
            answer: `**Short-run supernormal profit equilibrium** occurs when market price exceeds average cost (P > AC):

**Profit-maximizing condition**: Firm produces at Q* where MC = MR (profit maximization rule)

**Diagram description**:
- Horizontal axis: Quantity (Q)
- Vertical axis: Price/Cost ($)
- Curves shown:
  * MC curve: U-shaped, cutting through minimum points of AC and AVC
  * AC curve: U-shaped, above AVC
  * AVC curve: U-shaped, lowest curve
  * D = AR = MR: Horizontal line at price P*

**Equilibrium point**: 
- Firm produces Q* where MC = MR = P*
- Price P* is above AC at output Q*
- Supernormal profit shown as shaded rectangle: (P* - AC) × Q*

**Economic analysis**:

1. **Why this occurs**: Strong market demand relative to supply pushes market price above typical firm costs. Perhaps due to:
   - Increased consumer demand (e.g., surge in demand for eggs during festive season)
   - Reduced market supply (e.g., disease affecting livestock)
   - New market opening up

2. **Profit calculation**:
   - Total Revenue (TR) = P* × Q*
   - Total Cost (TC) = AC × Q*
   - Supernormal Profit = (P* - AC) × Q*
   - Shown as rectangular area between P* and AC curves from 0 to Q*

3. **Short-run stability**: Firms cannot immediately enter due to time required to establish operations, even without barriers.

**Singapore example**: During the 2020-2021 COVID-19 period, many fish farms in Singapore earned supernormal profits as prices surged due to import disruptions while existing farms could not immediately expand significantly. Price of fresh fish rose 20-30% while production costs remained stable.

**Important note**: This supernormal profit is temporary. In the long run, new firms will be attracted to enter the market, increasing supply and driving price down until only normal profit remains.`,
            level: 'JC',
            category: 'H2 Economics',
            topic: 'Market Structure',
            difficulty: 'hard',
            economicsType: 'Micro',
            chapter: 'Market Structure',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            question: 'Explain the short-run equilibrium when a perfectly competitive firm earns normal profit (break-even point).',
            answer: `**Normal profit (break-even) equilibrium** occurs when price exactly equals average cost (P = AC):

**Equilibrium condition**: 
- Firm produces at Q* where MC = MR = P*
- At Q*, price P* = AC (Average Cost)
- Economic profit = zero (normal profit only)

**Diagram description**:
- MC curve intersecting MR at Q*
- AC curve tangent to (just touching) the demand curve D = AR = MR at price P*
- This tangency point represents the break-even point
- No shaded profit rectangle (profit area has zero height)

**Key characteristics**:

1. **Normal profit definition**: The minimum profit necessary to keep the firm in business. It includes:
   - Opportunity cost of capital
   - Opportunity cost of entrepreneur's time and effort
   - Risk premium for undertaking business

2. **Why firm continues operating**: Although economic profit is zero, the firm is still covering all explicit costs PLUS implicit costs (opportunity costs). The entrepreneur is earning as much as they could in their next best alternative.

3. **Mathematical relationship**:
   - Total Revenue (TR) = P* × Q* = AC × Q* = Total Cost (TC)
   - Economic Profit = TR - TC = 0
   - Accounting Profit = Positive (covers explicit costs plus normal profit)

**Stability analysis**: This represents a stable equilibrium in the long run. There is:
- No incentive for new firms to enter (no supernormal profit to attract them)
- No incentive for existing firms to exit (they're covering all opportunity costs)

**Singapore example**: Many small hawker stalls in Singapore operate near break-even, earning enough to cover rent, ingredients, labor costs, and provide a living comparable to alternative employment. For instance, a chicken rice stall owner earning $4,000 monthly may be at break-even if they could earn $4,000 working as a manager elsewhere.

**Distinction from accounting profit**: 
- Accounting profit = Revenue - Explicit costs (positive at break-even)
- Economic profit = Revenue - (Explicit + Implicit costs) (zero at break-even)`,
            level: 'JC',
            category: 'H2 Economics',
            topic: 'Market Structure',
            difficulty: 'medium',
            economicsType: 'Micro',
            chapter: 'Market Structure',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            question: 'Explain the short-run equilibrium when a firm makes subnormal profit (loss) but continues operating. Why doesn\'t the firm shut down?',
            answer: `**Subnormal profit (loss) equilibrium** occurs when price is below average cost but above average variable cost (AC > P > AVC):

**Equilibrium condition**:
- Firm produces at Q* where MC = MR = P*
- Price P* < AC (making a loss)
- But P* > AVC (covering variable costs plus some fixed costs)

**Diagram description**:
- MC curve intersecting MR at Q*
- AC curve above the demand curve at Q* (indicating loss)
- AVC curve below the demand curve at Q* (indicating coverage of variable costs)
- Loss shown as shaded rectangle: (AC - P*) × Q*
- Contribution to fixed costs: (P* - AVC) × Q*

**Why firm continues operating**:

1. **Covering variable costs**: Price exceeds AVC, meaning each unit sold covers:
   - All variable costs (raw materials, hourly wages, electricity)
   - PLUS contributes something toward fixed costs (rent, salaries, insurance)

2. **Minimizing loss**: Two scenarios to compare:
   
   **Scenario A - Continue operating**:
   - Revenue = P* × Q*
   - Loss = (AC - P*) × Q* = TFC + some coverage
   - Net position: Losing less than total fixed costs

   **Scenario B - Shut down**:
   - Revenue = $0
   - Loss = Total Fixed Costs (must still pay rent, insurance, etc.)
   - Net position: Losing entire fixed cost

   Therefore: Loss from operating < Loss from shutting down

3. **Short-run vs Long-run perspective**: Fixed costs are sunk in the short run. The firm hopes market conditions will improve:
   - Demand may increase
   - Competitors may exit
   - Costs may decrease

**Mathematical demonstration**:
- If P = $8, AVC = $6, AC = $10, Q = 1,000 units
- Contribution = (P - AVC) × Q = ($8 - $6) × 1,000 = $2,000 toward fixed costs
- Loss = (AC - P) × Q = ($10 - $8) × 1,000 = $2,000
- If shut down: Lose entire fixed cost of $4,000
- Better to operate and lose only $2,000

**Singapore example**: During the 2020 COVID-19 circuit breaker, many F&B establishments made losses but continued operating with takeaway/delivery because:
- Revenue ($50,000/month) < Total costs ($65,000/month)
- But Revenue > Variable costs ($40,000/month)
- Contributing $10,000 toward $25,000 fixed costs (rent, salaries)
- Shutting down would mean losing entire $25,000 monthly fixed costs
- Better to operate and lose only $15,000 instead of $25,000

**Key principle**: In the short run, fixed costs are irrelevant to the operating decision. Only variable costs matter. As long as P > AVC, continue operating.`,
            level: 'JC',
            category: 'H2 Economics',
            topic: 'Market Structure',
            difficulty: 'hard',
            economicsType: 'Micro',
            chapter: 'Market Structure',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            question: 'Explain the short-run shutdown condition (P < AVC) and why a firm shuts down temporarily when price falls below average variable cost.',
            answer: `**Short-run shutdown condition** occurs when price falls below average variable cost (P < AVC):

**Shutdown rule**: If P < AVC, the firm should temporarily cease production immediately.

**Economic logic**:

1. **Cannot cover variable costs**: At P < AVC, revenue from each unit sold is insufficient to cover the variable costs of producing that unit.

2. **Loss comparison**:

   **Scenario A - Continue operating when P < AVC**:
   - Revenue = P × Q
   - Variable Cost = AVC × Q
   - Since P < AVC: Revenue < Variable Cost
   - Loss = Fixed Costs + (AVC - P) × Q
   - Losing MORE than fixed costs

   **Scenario B - Shut down**:
   - Revenue = $0
   - Variable Costs = $0 (stop all variable inputs)
   - Loss = Fixed Costs only
   - Losing ONLY fixed costs

   **Conclusion**: Loss from operating > Loss from shutting down, so SHUT DOWN

**Diagram description**:
- Price P* is below the minimum point of the AVC curve
- If firm were to produce, it would be at a point where the demand line D = AR = MR is below AVC
- Loss rectangle would show: (AC - P) × Q where P < AVC < AC
- The (AVC - P) × Q portion represents additional loss beyond fixed costs

**Mathematical example**:
- Price = $5
- AVC = $7
- AC = $12 (includes $5 fixed cost per unit)
- Quantity if operating = 1,000 units

**Operating loss calculation**:
- Revenue = $5 × 1,000 = $5,000
- Variable costs = $7 × 1,000 = $7,000
- Loss on variable costs alone = $2,000
- Plus fixed costs = $5,000
- Total loss = $7,000

**Shutdown loss calculation**:
- Revenue = $0
- Variable costs = $0
- Loss = Fixed costs only = $5,000
- Total loss = $5,000

**Conclusion**: By operating, firm loses $7,000. By shutting down, firm loses only $5,000. Rational decision is to shut down.

**Singapore example**: In December 2023, when severe floods hit Malaysian vegetable farms, supply to Singapore crashed and prices for vegetables spiked, but some local hydroponics farms with high variable costs (electricity, nutrients, labor) found that even the higher prices couldn't cover their AVC. If a farm's AVC was $6/kg but market price only rose to $5/kg, they would temporarily shut down operations rather than lose money on every unit produced.

**Temporary vs permanent**: This is a SHORT-RUN shutdown. The firm:
- Stops production temporarily
- Still pays fixed costs (rent, insurance, permanent staff salaries)
- Maintains equipment and facilities
- Can restart quickly if prices recover above AVC
- Different from long-run exit where firm sells off everything and leaves permanently

**Key insight**: In the short run, produce only if P ≥ AVC. If P < AVC, every unit produced adds to losses beyond fixed costs.`,
            level: 'JC',
            category: 'H2 Economics',
            topic: 'Market Structure',
            difficulty: 'hard',
            economicsType: 'Micro',
            chapter: 'Market Structure',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            question: 'Explain the long-run shutdown (exit) condition and why a firm exits the market permanently when price falls below average cost.',
            answer: `**Long-run exit condition** occurs when price persistently remains below average cost (P < AC):

**Exit rule**: If P < AC in the long run, the firm should exit the market permanently.

**Key distinction from short-run shutdown**:
- **Short run**: Fixed costs are sunk; shut down only if P < AVC
- **Long run**: All costs are variable (no sunk costs); exit if P < AC

**Economic reasoning**:

1. **Below break-even**: When P < AC, the firm makes economic losses (subnormal profit). It cannot cover all opportunity costs.

2. **Long-run flexibility**: In the long run:
   - No costs are fixed (can sell equipment, terminate lease, etc.)
   - Firm can recover all capital by exiting
   - No sunk costs to consider

3. **Opportunity cost principle**: By staying in the market with P < AC:
   - Entrepreneur earns less than opportunity cost
   - Capital could earn better returns elsewhere
   - Resources could be redeployed to more profitable ventures

**Diagram analysis**:
- Price P* below the AC curve at all output levels
- Even at the minimum point of AC, P* < AC
- Firm makes losses at every possible output level
- Loss shown as: (AC - P*) × Q* for any output Q*

**Exit decision framework**:

When P < AC:
- Economic profit = negative (making losses)
- Better alternatives exist for resources
- Rational decision = EXIT permanently

When P ≥ AC:
- Economic profit ≥ 0 (at least breaking even)
- Earning opportunity cost or better
- Rational decision = STAY in market

**Mathematical example**:
- Long-run price = $8
- Long-run AC = $10
- All costs are now variable (can exit lease, sell equipment)
- Loss per unit = $2
- At Q = 1,000: Total loss = $2,000

**Exit vs Stay comparison**:
- **Stay**: Lose $2,000 continuously every period
- **Exit**: Recover all capital, redeploy to earn normal profit elsewhere
- **Rational choice**: Exit permanently

**Singapore example**: Between 2015-2019, several pig farms in Singapore closed down permanently as:
- Market prices for pork remained around $6-7 per kg
- Long-run AC (including opportunity costs) was $8-9 per kg
- Could not compete with cheaper Malaysian imports
- Farmers could earn better returns by selling land and investing proceeds
- Examples: Farms at Lim Chu Kang and Kranji exited the industry entirely

Notable case: The number of pig farms in Singapore decreased from 10 farms in 2017 to just 3 farms by 2023.

**Long-run market adjustment**:
When multiple firms exit due to P < AC:
1. Market supply decreases (supply curve shifts left)
2. Market price increases
3. Process continues until P = AC for remaining firms
4. Market reaches new long-run equilibrium

**Key principle**: In the long run, firms stay in the market only if they can at least break even (earn normal profit). Any persistent economic loss triggers exit, as all costs are avoidable in the long run and resources can be better employed elsewhere.

**Time horizon difference**:
- Short run: Tolerate losses if P > AVC (cover variable costs)
- Long run: Exit if P < AC (cannot cover all opportunity costs)`,
            level: 'JC',
            category: 'H2 Economics',
            topic: 'Market Structure',
            difficulty: 'hard',
            economicsType: 'Micro',
            chapter: 'Market Structure',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            question: 'Explain the long-run equilibrium adjustment process in perfect competition when firms earn supernormal profits. How is normal profit restored?',
            answer: `**Long-run adjustment mechanism** in perfect competition automatically eliminates supernormal profits through firm entry:

**Initial condition**: Existing firms earn supernormal profits (P > AC)

**Adjustment process - Step by step**:

**Step 1: Signal for entry**
- Supernormal profits attract potential entrepreneurs
- No barriers to entry allow new firms to enter freely
- Signal is clear: opportunity for above-normal returns

**Step 2: New firms enter**
- Attracted by supernormal profits, new firms establish operations
- Takes time (short run vs long run distinction)
- Could be months or years depending on industry

**Step 3: Market supply increases**
- Each new firm adds to market supply
- Industry supply curve shifts rightward (S1 → S2)
- Movement from Q1 to Q2 in market diagram

**Step 4: Market price falls**
- Increased supply with unchanged demand
- Market equilibrium price falls from P1 to P2
- Price decline is industry-wide (affects all firms)

**Step 5: Individual firm adjustment**
- Firm's demand curve shifts downward (P1 to P2)
- Supernormal profit rectangle shrinks
- Continues until demand curve tangent to AC curve

**Step 6: Long-run equilibrium reached**
- Price P2 = AC (minimum point of AC curve)
- Economic profit = zero (normal profit only)
- No incentive for further entry or exit

**Diagram description - Market level**:
- Initial: S1 intersects D at high price P1
- Final: S2 (rightward shift) intersects D at lower price P2
- Quantity increases from Q1 to Q2

**Diagram description - Firm level**:
- Initial: D1 = AR1 = MR1 at P1, above AC curve, supernormal profit shown
- Final: D2 = AR2 = MR2 at P2, tangent to AC curve at minimum point, zero economic profit
- Output per firm may decrease from q1 to q2

**Key features of long-run equilibrium**:

1. **P = minimum AC**: Price equals lowest possible average cost
2. **Economic profit = 0**: All firms earn normal profit only
3. **MC = MR = P = AC**: All conditions satisfied simultaneously
4. **Productive efficiency**: Firms produce at minimum AC
5. **Allocative efficiency**: P = MC (covered in separate flashcard)

**Time required**: Adjustment is not instantaneous:
- Short run: Cannot enter due to fixed factors
- Long run: Entry occurs as fixed factors become variable
- Real time could be 1-5 years depending on industry

**Singapore example**: During 2020-2021 COVID-19 pandemic:

**Phase 1 (Supernormal profit)**: Mask manufacturers earned huge profits
- Surgical masks sold at $0.50-0.80 per piece (high demand, limited supply)
- Production cost around $0.10-0.15 per piece
- Supernormal profit of $0.35-0.65 per mask

**Phase 2 (Entry)**: New firms entered mask production
- Numerous textile manufacturers switched to mask production
- New specialized mask factories established
- Local firms like Ramatex, Hyphens Pharma expanded mask lines

**Phase 3 (Supply increase, price fall)**: By 2022
- Market saturated with suppliers
- Mask prices fell to $0.15-0.25 per piece
- Approaching cost of production

**Phase 4 (Normal profit)**: By 2023
- Many temporary producers exited
- Remaining firms earn normal profit only
- Price stabilized around $0.15-0.20 per piece

**Market efficiency result**: The entry process:
- Eliminates supernormal profit
- Increases total output
- Lowers prices for consumers
- Ensures efficient allocation of resources
- Achieves social optimum automatically (invisible hand)

**Why this doesn't happen in other market structures**:
- Monopoly: Barriers prevent entry, supernormal profit persists
- Oligopoly: High barriers limit entry
- Monopolistic competition: Entry occurs but product differentiation allows some profit

**Important note**: The process is self-correcting and requires no government intervention. Adam Smith's "invisible hand" ensures resources flow to their most valued use.`,
            level: 'JC',
            category: 'H2 Economics',
            topic: 'Market Structure',
            difficulty: 'hard',
            economicsType: 'Micro',
            chapter: 'Market Structure',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            question: 'Explain how perfect competition achieves allocative efficiency (P = MC) and why this maximizes social welfare.',
            answer: `**Allocative efficiency** in perfect competition occurs when P = MC, ensuring optimal resource allocation and maximum social welfare.

**Definition**: Allocative efficiency exists when resources are allocated to produce the combination of goods and services most valued by society. At this point, marginal social benefit (MSB) equals marginal social cost (MSC).

**Achievement of P = MC in perfect competition**:

1. **Firm's equilibrium**: Firm maximizes profit where MC = MR
2. **Price-taking behavior**: In perfect competition, P = MR
3. **Combination**: MC = MR and P = MR, therefore P = MC
4. **No externalities assumption**: P = MSB and MC = MSC
5. **Conclusion**: MSB = MSC (allocative efficiency)

**Why P = MC maximizes social welfare**:

**At P = MC**:
- Consumer's marginal benefit (P) = Society's marginal cost (MC)
- Last unit consumed: benefit = cost
- No potential for welfare improvement
- Total surplus (consumer + producer surplus) is maximized

**If P > MC** (underproduction):
- Marginal benefit exceeds marginal cost
- Society values additional units more than cost of production
- Deadweight loss from units NOT produced
- Welfare could increase by producing more

**If P < MC** (overproduction):
- Marginal cost exceeds marginal benefit
- Cost of producing additional units exceeds their value to society
- Deadweight loss from excess production
- Welfare would increase by producing less

**Diagram description**:

**Market diagram showing allocative efficiency**:
- Demand curve D = MSB (marginal social benefit)
- Supply curve S = MSC (marginal social cost in perfect competition)
- Equilibrium at E where D intersects S
- Equilibrium quantity Q* where MSB = MSC
- Consumer surplus: Area above P*, below D, from 0 to Q*
- Producer surplus: Area below P*, above S, from 0 to Q*
- Total surplus maximized at Q*

**Why deviations reduce welfare**:

**Case 1: Output Q1 < Q*** (underproduction):
- At Q1: MSB > MSC (demand curve above supply curve)
- Deadweight loss triangle between Q1 and Q*
- Units between Q1 and Q* should be produced (benefit > cost)

**Case 2: Output Q2 > Q*** (overproduction):
- At Q2: MSC > MSB (supply curve above demand curve)
- Deadweight loss triangle between Q* and Q2
- Units between Q* and Q2 should NOT be produced (cost > benefit)

**Welfare maximization proof**:

Total welfare = Consumer Surplus + Producer Surplus

**At Q***:
- CS = ∫[0 to Q*] (Demand price - P*) dQ
- PS = ∫[0 to Q*] (P* - Supply price) dQ
- Total = Maximum possible

**At Q ≠ Q***:
- Area of deadweight loss = welfare reduction
- Triangle with base |Q - Q*| and height |MSB - MSC|

**Real-world interpretation - Singapore example**:

**Allocatively efficient market: Wet market vegetables**
- Price reflects true marginal cost of production
- Consumers buy until marginal benefit = price
- No over or underproduction of vegetables
- Resources allocated optimally between different vegetables

**Contrast with monopoly (allocatively inefficient)**:
- Monopolist sets P > MC to maximize profit
- Creates deadweight loss
- Underproduction relative to social optimum
- Example: Singapore's historical telecom monopoly pre-liberalization

**Policy implications**:

1. **Free markets**: Perfect competition naturally achieves allocative efficiency without intervention

2. **Market failures**: When competition is imperfect:
   - Monopoly: P > MC, underproduction, welfare loss
   - Externalities: MSB ≠ P or MSC ≠ MC, inefficiency
   - Public goods: Market failure, zero production

3. **Government role**: Intervention justified only when:
   - Market structure is not competitive
   - Externalities exist
   - Public goods involved
   - Information asymmetries present

**Singapore example - Electricity market**:

**Before liberalization (monopoly)**:
- Single provider (Singapore Power)
- P > MC, allocative inefficiency
- Deadweight loss from underproduction

**After liberalization (2018 onwards)**:
- Open Electricity Market introduced
- Multiple retailers compete
- Price closer to MC (more competitive)
- Improved allocative efficiency
- Consumer savings estimated at 5-10% annually

**Important conditions**:

Allocative efficiency in perfect competition assumes:
1. No externalities (MSB = demand, MSC = supply)
2. Perfect information
3. No public goods involved
4. Competitive markets (no market power)

**Mathematical expression**:
- Allocative efficiency: P = MC = MSB = MSC
- Total welfare maximized: ∂(CS + PS)/∂Q = 0 at Q*
- Deadweight loss = 0

**Key insight**: Perfect competition's price-taking behavior and profit maximization automatically lead to P = MC, achieving allocative efficiency without any central planning or government intervention. This is the theoretical foundation for advocating free markets.`,
            level: 'JC',
            category: 'H2 Economics',
            topic: 'Market Structure',
            difficulty: 'hard',
            economicsType: 'Micro',
            chapter: 'Market Structure',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            question: 'Explain how perfect competition achieves productive efficiency (P = minimum AC) in the long run and illustrate with a diagram.',
            answer: `**Productive efficiency** in perfect competition occurs in long-run equilibrium when firms produce at minimum average cost (P = minimum AC).

**Definition**: Productive efficiency exists when goods are produced at the lowest possible cost per unit, using the most efficient combination of inputs and technology.

**How perfect competition achieves productive efficiency**:

**Step 1: Long-run adjustment process**
- Entry and exit of firms in response to profits/losses
- Process continues until economic profit = 0
- Final equilibrium: P = AC

**Step 2: Profit maximization condition**
- Firms must produce where MC = MR = P
- At long-run equilibrium, this occurs where P = minimum AC

**Step 3: Mathematical necessity**
- For P = AC to hold at profit-maximizing output
- Must occur where AC curve is at its minimum
- Because MC intersects AC at AC's minimum point

**Why P = minimum AC**:

1. **Profit maximization**: Firm produces where MC = P
2. **Zero economic profit**: In long run, P = AC
3. **Combining (1) and (2)**: MC = P = AC
4. **Geometric fact**: MC intersects AC only at minimum point of AC
5. **Conclusion**: Production occurs at minimum AC

**Diagram description**:

**Long-run equilibrium for the firm**:
- Horizontal demand line D = AR = MR at price P*
- U-shaped MC curve
- U-shaped AC curve
- MC curve intersects AC curve at minimum point of AC
- This intersection point is exactly at price level P*
- Equilibrium output Q* where MC = MR = P* = minimum AC
- No profit or loss rectangle (zero economic profit)

**Key features at minimum AC**:
- Lowest cost per unit of output
- Optimal scale of production
- Most efficient use of all inputs
- No technical inefficiency
- No X-inefficiency

**Economic interpretation**:

1. **Cost minimization**: Firms cannot reduce unit costs further at this output level

2. **Technical efficiency**: Firms use best available technology and input combinations

3. **Optimal scale**: Firms operate at most efficient size (neither too small nor too large)

4. **No waste**: Resources fully utilized without slack

**Comparison with other market structures**:

**Perfect Competition (Long run)**:
- Produces at minimum AC ✓
- Zero economic profit
- P = minimum AC
- Productively efficient

**Monopoly**:
- Produces where P > AC
- Output Q < Q at minimum AC
- Does NOT produce at minimum AC ✗
- Productively inefficient

**Monopolistic Competition (Long run)**:
- Produces where AC > minimum AC
- Excess capacity exists
- Does NOT produce at minimum AC ✗
- Productively inefficient

**Why short run ≠ productive efficiency**:

In short run with supernormal profit:
- P > AC (P above AC curve)
- Q where MC = P may not be at minimum AC
- May be producing left or right of minimum AC
- Temporarily productively inefficient

**Real-world Singapore examples**:

**Example 1: Rice wholesale market**
- Many rice importers/wholesalers
- Intense competition forces cost minimization
- Firms operate at efficient scale
- Those with higher unit costs exit market
- Survivors produce at near-minimum AC
- Rice prices among lowest in region

**Example 2: Generic drug manufacturers**
- Post-patent expiry, many manufacturers enter
- Competition drives prices toward production cost
- Inefficient producers exit
- Remaining firms produce at minimum AC
- Generic drug prices fall 80-90% from branded prices

**Example 3: Commodity traders (crude palm oil)**
- Numerous traders in competitive market
- Profit margins thin (typically <2%)
- Forces efficient operations at minimum cost
- High-cost traders cannot survive
- Industry operates at productive efficiency

**Contrast: Singapore Telecom pre-liberalization**
- Monopoly provider (Singtel before 2000)
- Higher prices, P > AC
- Not operating at minimum AC
- X-inefficiency (organizational slack)
- Post-liberalization: Competition forced cost reduction

**Benefits to society**:

1. **Lower prices**: Minimum AC → lowest possible price (P = AC in long run)
2. **Efficient resource use**: No waste of scarce resources
3. **Maximum output**: Given costs, maximum production from resources
4. **Innovation pressure**: Must adopt best technology or exit
5. **Consumer welfare**: Lowest prices consistent with covering costs

**Mathematical conditions**:

At productive efficiency:
- Q* where d(AC)/dQ = 0 (minimum point)
- Also where MC = AC
- In perfect competition long run: P = MC = minimum AC

**Important distinctions**:

1. **Allocative efficiency**: P = MC (right quantity produced)
2. **Productive efficiency**: P = minimum AC (produced at lowest cost)
3. **Both achieved**: Only in perfect competition long run

**Dynamic efficiency consideration**:

Perfect competition achieves:
- Static productive efficiency ✓ (minimum cost today)
- But may lack dynamic efficiency ✗ (innovation over time)
- Zero profit leaves no funds for R&D
- Trade-off between static and dynamic efficiency

**Key insight**: Perfect competition's twin pressures of profit maximization and free entry/exit force firms to the minimum point of their AC curves in long run. Any firm producing above minimum AC makes losses and exits, while those at minimum AC earn normal profit and survive. This natural selection process ensures productive efficiency.`,
            level: 'JC',
            category: 'H2 Economics',
            topic: 'Market Structure',
            difficulty: 'hard',
            economicsType: 'Micro',
            chapter: 'Market Structure',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            question: 'What are some real-world approximations of perfect competition? Why is pure perfect competition rare in reality?',
            answer: `**Real-world approximations** of perfect competition exist in certain markets, but pure perfect competition remains rare due to practical limitations.

**Markets approximating perfect competition**:

**1. Agricultural commodity markets**

**Singapore context - Vegetable wholesale market**:
- Location: Pasir Panjang Wholesale Centre
- Many sellers: 50+ vegetable wholesalers
- Relatively homogeneous products: Similar quality vegetables
- Low barriers: Easy for new wholesalers to enter
- Price discovery: Prices adjust daily based on supply/demand
- Approximation strength: 7/10 (product differentiation exists)

**Global context - Wheat markets**:
- Thousands of wheat farmers worldwide
- Standardized commodity grades (e.g., No. 1 Hard Red Winter)
- Chicago Board of Trade: Transparent price discovery
- Low barriers to entry for farmers
- Approximation strength: 8/10

**2. Foreign exchange (Forex) markets**

**Singapore as global forex hub**:
- 3rd largest forex center globally (after London and New York)
- Homogeneous product: Currency pairs perfectly identical
- Millions of traders: Banks, corporations, individuals
- Perfect information: Real-time prices via Reuters, Bloomberg
- Price takers: Individual traders cannot influence exchange rates
- Example: SGD/USD trading volume >$600 billion daily
- Approximation strength: 9/10 (closest to perfect competition)

**3. Stock markets (for liquid stocks)**

**Singapore Exchange (SGX)**:
- DBS shares: Perfectly homogeneous units
- Numerous buyers/sellers: Retail and institutional investors
- Perfect information: Real-time prices, financial statements
- Low barriers: Easy to buy/sell via brokerage
- Price takers: Individual investor cannot move share price
- Approximation strength: 8/10

**4. Commodity exchanges**

**Singapore - LME Asia**:
- Metals trading (copper, aluminum, zinc)
- Standardized contract specifications
- Transparent pricing
- Many participants globally
- Near-perfect information flow
- Approximation strength: 8/10

**5. Generic pharmaceutical markets**

**Post-patent expiry drugs**:
- Many manufacturers (e.g., generic paracetamol)
- Identical chemical composition
- Low differentiation
- Easy market entry (relative to new drugs)
- Competitive pricing
- Approximation strength: 6/10

**Why pure perfect competition is rare**:

**1. Product differentiation inevitable**

Even "homogeneous" products have differences:
- **Vegetables**: Organic vs conventional, freshness varies, origin matters
- **Example**: Consumers may prefer Malaysian vegetables over Chinese vegetables
- **Result**: Not perfectly homogeneous

**2. Branding and marketing**

Firms create perceived differentiation:
- **Rice example**: "Jasmine rice" vs "Thai fragrant rice" (similar products, different branding)
- **Singapore context**: FairPrice brand vs generic brands (same supplier often)
- **Result**: Breaks homogeneity assumption

**3. Information asymmetries**

Perfect information rarely exists:
- **Used cars**: Sellers know more than buyers (lemons problem)
- **Financial products**: Complex derivatives, asymmetric information
- **Medical services**: Patients cannot fully evaluate doctor quality
- **Result**: Breaks perfect information assumption

**4. Barriers to entry exist**

Even "low barrier" industries have obstacles:
- **Capital requirements**: Minimum investment needed
- **Regulatory licenses**: Food handling licenses for hawkers
- **Expertise**: Technical knowledge required
- **Singapore example**: Hawker license system creates some barriers
- **Result**: Breaks free entry assumption

**5. Economies of scale**

Large firms have cost advantages:
- **Supermarkets**: NTUC FairPrice bulk purchasing power
- **Manufacturing**: Unit costs fall with scale
- **Result**: Tendency toward oligopoly, not perfect competition

**6. Government intervention**

Regulations create departures from perfect competition:
- **Minimum wages**: Singapore's Progressive Wage Model
- **Agricultural subsidies**: Many countries subsidize farmers
- **Import quotas**: Singapore's historical egg import licensing
- **Result**: Breaks free market assumptions

**7. Geographical factors**

Location creates local monopolies:
- **Hawker centers**: Limited competition within each center
- **Petrol stations**: Nearest station has some pricing power
- **Transport costs**: Creates regional market segmentation
- **Result**: Breaks assumptions of perfect mobility

**8. Network effects**

Some markets have increasing returns:
- **Payment systems**: PayNow, GrabPay - value increases with users
- **Social media**: More users = more valuable
- **Result**: Tendency toward monopoly/oligopoly

**Degrees of approximation - Ranking**:

**Closest to perfect competition (8-9/10)**:
1. Foreign exchange markets
2. Commodity futures exchanges
3. Stock markets (liquid stocks)

**Moderate approximation (6-7/10)**:
4. Agricultural commodities (wholesale)
5. Generic pharmaceuticals
6. Basic construction materials (sand, cement)

**Weak approximation (3-5/10)**:
7. Retail markets (differentiation exists)
8. Service industries (personalization)
9. Most manufacturing (branding)

**Singapore-specific considerations**:

**Markets closer to perfect competition**:
- Wholesale vegetable market (Pasir Panjang)
- Forex trading (global hub)
- Ship bunkering (world's largest)
- Commodity trading (metals, oil)

**Markets far from perfect competition**:
- Public transport (regulated monopoly/duopoly)
- Telecommunications (oligopoly)
- Supermarkets (oligopoly: NTUC, Sheng Siong, Giant)
- Banking (oligopoly: DBS, OCBC, UOB)

**Theoretical vs practical importance**:

**Why study perfect competition if it's rare?**

1. **Benchmark**: Ideal standard to measure market efficiency
2. **Policy reference**: Guide for competition policy
3. **Approximations**: Many markets "close enough" for analysis
4. **Understanding**: Foundation for analyzing other market structures
5. **Welfare analysis**: Shows maximum achievable efficiency

**Important conclusion**: While pure perfect competition rarely exists, understanding its model helps:
- Identify market failures
- Design competition policies
- Evaluate welfare implications
- Analyze real-world markets by degree of competitiveness

**Singapore policy example**: Competition and Consumer Commission of Singapore (CCCS) uses perfect competition as benchmark to assess whether markets are "sufficiently competitive" and whether intervention is needed.`,
            level: 'JC',
            category: 'H2 Economics',
            topic: 'Market Structure',
            difficulty: 'medium',
            economicsType: 'Micro',
            chapter: 'Market Structure',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
    ];

    await db.insert(flashcards).values(sampleFlashcards);
    
    console.log('✅ Perfect Competition flashcards seeder completed successfully - 12 comprehensive flashcards created for JC Economics H2');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});